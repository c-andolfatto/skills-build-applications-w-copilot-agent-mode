import { useEffect, useState } from 'react';
import { getApiBase } from '../apiBase';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${getApiBase()}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setTeams(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error loading teams: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id ?? t.id}>
              <td>{t.name}</td>
              <td>
                {Array.isArray(t.members)
                  ? t.members.map((m) => m?.username ?? m).join(', ')
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {teams.length === 0 && <p className="text-muted">No teams found.</p>}
    </div>
  );
}
