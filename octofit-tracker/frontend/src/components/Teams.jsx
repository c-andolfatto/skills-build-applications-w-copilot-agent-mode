import { useEffect, useState } from 'react'

import { fetchCollection } from './shared'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
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
            <h2 className="h4 mb-1">Team competitions</h2>
            <p className="text-body-secondary mb-0">Highlight active groups and their current challenges.</p>
          </div>
          <span className="badge text-bg-primary">{items.length} loaded</span>
        </div>
        {error ? (
          <div className="alert alert-warning mb-0">{error}</div>
        ) : items.length ? (
          <div className="row g-3">
            {items.map((team) => (
              <div className="col-md-6" key={team._id ?? team.id ?? team.name}>
                <article className="border rounded-3 h-100 p-3 bg-light-subtle">
                  <h3 className="h5">{team.name}</h3>
                  <p className="text-body-secondary">{team.description}</p>
                  <p className="mb-2"><strong>Challenge:</strong> {team.challenge}</p>
                  <p className="mb-0 small">
                    <strong>Members:</strong>{' '}
                    {(team.members ?? []).map((member) => member?.name).filter(Boolean).join(', ') || 'No members yet'}
                  </p>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-0 text-body-secondary">No teams are available yet.</p>
        )}
      </div>
    </section>
  )
}

export default Teams
