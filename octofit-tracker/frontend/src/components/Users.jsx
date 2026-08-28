import { useEffect, useState } from 'react';

// VITE_CODESPACE_NAME must be defined in .env.local, e.g.: VITE_CODESPACE_NAME=my-codespace
// Falls back to localhost:8000 when unset (local development).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error loading users: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id ?? u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="text-muted">No users found.</p>}
    </div>
  );
}
