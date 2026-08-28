import { useEffect, useState } from 'react'

import { fetchCollection } from './shared'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    fetchCollection(endpoint)
      .then((results) => {
        if (!ignore) {
          setItems(results)
        }
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3 gap-3 flex-wrap">
          <div>
            <h2 className="h4 mb-1">Student profiles</h2>
            <p className="text-body-secondary mb-0">Track goals, fitness levels, and favorite activities.</p>
          </div>
          <span className="badge text-bg-primary">{items.length} loaded</span>
        </div>
        {error ? (
          <div className="alert alert-warning mb-0">{error}</div>
        ) : items.length ? (
          <div className="row g-3">
            {items.map((user) => (
              <div className="col-md-6 col-xl-4" key={user._id ?? user.id ?? user.email}>
                <article className="border rounded-3 h-100 p-3 bg-light-subtle">
                  <h3 className="h5">{user.name}</h3>
                  <p className="mb-2 text-body-secondary">{user.email}</p>
                  <ul className="list-unstyled mb-0 small">
                    <li><strong>Level:</strong> {user.fitnessLevel}</li>
                    <li><strong>Goal:</strong> {user.goal}</li>
                    <li><strong>Favorite:</strong> {user.favoriteActivity}</li>
                  </ul>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-0 text-body-secondary">No student profiles are available yet.</p>
        )}
      </div>
    </section>
  )
}

export default Users
