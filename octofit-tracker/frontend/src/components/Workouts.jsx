import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined in .env.local, e.g.: VITE_CODESPACE_NAME=my-codespace
// Falls back to localhost:8000 when unset (local development).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setWorkouts(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error loading workouts: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w._id ?? w.id}>
              <td>{w.name}</td>
              <td>{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {workouts.length === 0 && <p className="text-muted">No workouts found.</p>}
    </div>
  );
}
