import React, { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Solomon Ferede — Portfolio</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.technologies}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
