import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined in .env.local, e.g.: VITE_CODESPACE_NAME=my-codespace
// Falls back to localhost:8000 when unset (local development).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setEntries(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error loading leaderboard: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, idx) => (
            <tr key={e._id ?? e.id ?? idx}>
              <td>{idx + 1}</td>
              <td>{e.user?.username ?? e.username ?? e.user}</td>
              <td>{e.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 && <p className="text-muted">No leaderboard entries found.</p>}
    </div>
  );
}
