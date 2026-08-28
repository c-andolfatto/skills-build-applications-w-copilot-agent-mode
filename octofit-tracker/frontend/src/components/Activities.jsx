import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined in .env.local, e.g.: VITE_CODESPACE_NAME=my-codespace
// Falls back to localhost:8000 when unset (local development).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setActivities(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error loading activities: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Activity Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id ?? a.id}>
              <td>{a.user?.username ?? a.user}</td>
              <td>{a.activity_type}</td>
              <td>{a.duration}</td>
              <td>{a.date ? new Date(a.date).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {activities.length === 0 && <p className="text-muted">No activities found.</p>}
    </div>
  );
}
