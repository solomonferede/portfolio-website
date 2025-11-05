#!/usr/bin/env bash

set -euo pipefail

# === Config ===
# Change these if needed
PROJECT_NAME="portfolio-website"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
PYTHON_BIN="python3"
VENVS_DIR="/opt/${PROJECT_NAME}"
VENV_PATH="$VENVS_DIR/venv"
GUNICORN_HOST="127.0.0.1"
GUNICORN_PORT="8001"
NGINX_SERVER_NAME="solomonferede.ethiodigital.com.et"  # set to your domain
CERTBOT_EMAIL="ezezsolomonferede@gmail.com"            # admin email for Let's Encrypt
WEB_ROOT="/var/www/${PROJECT_NAME}"
ENV_FILE_SOURCE="$PROJECT_ROOT/.env"   # single .env at repo root
ENV_FILE_TARGET="/etc/${PROJECT_NAME}.env"
SYSTEMD_SERVICE="/etc/systemd/system/gunicorn-${PROJECT_NAME}.service"
NGINX_SITE_AVAILABLE="/etc/nginx/sites-available/${PROJECT_NAME}.conf"
NGINX_SITE_ENABLED="/etc/nginx/sites-enabled/${PROJECT_NAME}.conf"

echo "Project root: $PROJECT_ROOT"

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "error: $1 is required"; exit 1; }
}

echo "[1/9] Updating apt and installing packages..."
sudo apt-get update -y
sudo apt-get install -y python3-venv python3-pip nginx git

echo "[2/9] Preparing Python virtual environment..."
sudo mkdir -p "$VENVS_DIR"
sudo chown -R "$USER":"$USER" "$VENVS_DIR"
if [ ! -d "$VENV_PATH" ]; then
  "$PYTHON_BIN" -m venv "$VENV_PATH"
fi
source "$VENV_PATH/bin/activate"

echo "[3/9] Installing backend dependencies..."
pip install --upgrade pip wheel
pip install -r "$BACKEND_DIR/requirements.txt"

echo "[4/9] Building frontend..."
pushd "$FRONTEND_DIR" >/dev/null
npm ci || npm install
npm run build
popd >/dev/null

echo "[5/9] Publishing frontend to $WEB_ROOT ..."
sudo mkdir -p "$WEB_ROOT"
sudo rsync -a --delete "$FRONTEND_DIR/dist/" "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

echo "[6/9] Applying database migrations..."
pushd "$BACKEND_DIR" >/dev/null
# Ensure env is available for Django
if [ -f "$ENV_FILE_SOURCE" ]; then
  echo "Copying .env to $ENV_FILE_TARGET"
  sudo cp "$ENV_FILE_SOURCE" "$ENV_FILE_TARGET"
  sudo chown root:root "$ENV_FILE_TARGET"
  sudo chmod 600 "$ENV_FILE_TARGET"
fi
"$VENV_PATH/bin/python" manage.py makemigrations
"$VENV_PATH/bin/python" manage.py migrate --noinput
popd >/dev/null

echo "[7/9] Creating systemd service for Gunicorn..."
sudo bash -c "cat > '$SYSTEMD_SERVICE'" <<SERVICE
[Unit]
Description=gunicorn daemon for ${PROJECT_NAME}
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=${BACKEND_DIR}
EnvironmentFile=${ENV_FILE_TARGET}
ExecStart=${VENV_PATH}/bin/gunicorn \
  --workers 3 \
  --bind ${GUNICORN_HOST}:${GUNICORN_PORT} \
  core.wsgi:application
Restart=always
KillSignal=SIGQUIT
TimeoutStopSec=5
PrivateTmp=true

[Install]
WantedBy=multi-user.target
SERVICE

echo "Reloading systemd and starting Gunicorn..."
sudo systemctl daemon-reload
sudo systemctl enable "gunicorn-${PROJECT_NAME}"
sudo systemctl restart "gunicorn-${PROJECT_NAME}"
sleep 2
sudo systemctl --no-pager --full status "gunicorn-${PROJECT_NAME}" || true

echo "[8/9] Configuring Nginx..."
sudo bash -c "cat > '$NGINX_SITE_AVAILABLE'" <<NGINX
server {
    listen 80;
    server_name ${NGINX_SERVER_NAME};

    root ${WEB_ROOT};
    index index.html;

    # Frontend app
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API reverse proxy
    location /api/ {
        proxy_pass http://${GUNICORN_HOST}:${GUNICORN_PORT}/api/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }

    # Gzip for assets
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
}
NGINX

if [ -L "$NGINX_SITE_ENABLED" ]; then
  sudo rm -f "$NGINX_SITE_ENABLED"
fi
sudo ln -s "$NGINX_SITE_AVAILABLE" "$NGINX_SITE_ENABLED"

# Disable default site if enabled
if [ -e "/etc/nginx/sites-enabled/default" ]; then
  sudo rm -f /etc/nginx/sites-enabled/default
fi

sudo nginx -t
sudo systemctl reload nginx

echo "Enabling firewall for Nginx (if ufw present)..."
if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow 'Nginx Full' || true
fi

echo "[9/9] Installing Certbot and obtaining HTTPS certificate..."
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx \
  -d "${NGINX_SERVER_NAME}" \
  --email "${CERTBOT_EMAIL}" \
  --agree-tos \
  --redirect \
  --non-interactive || echo "Certbot could not obtain a certificate yet. Ensure DNS points to this server and re-run: sudo certbot --nginx -d ${NGINX_SERVER_NAME}"

cat <<EOM

Deployment complete.

Next steps:
- Verify DNS A/AAAA records for ${NGINX_SERVER_NAME} point to this server.
- Ensure your .env at $ENV_FILE_TARGET has DB_* and VITE_API_BASE_URL set correctly.
- Frontend is served from $WEB_ROOT
- Backend is proxied at /api to Gunicorn on ${GUNICORN_HOST}:${GUNICORN_PORT}

Useful commands:
  sudo systemctl status gunicorn-${PROJECT_NAME}
  sudo journalctl -u gunicorn-${PROJECT_NAME} -f
  sudo systemctl reload nginx
  sudo certbot renew --dry-run

EOM

