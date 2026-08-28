import { useEffect, useState } from 'react'

import { fetchCollection } from './shared'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
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
            <h2 className="h4 mb-1">Workout suggestions</h2>
            <p className="text-body-secondary mb-0">Offer personalized ideas for the next session.</p>
          </div>
          <span className="badge text-bg-primary">{items.length} loaded</span>
        </div>
        {error ? (
          <div className="alert alert-warning mb-0">{error}</div>
        ) : items.length ? (
          <div className="row g-3">
            {items.map((workout) => (
              <div className="col-md-6 col-xl-4" key={workout._id ?? workout.id ?? workout.title}>
                <article className="border rounded-3 h-100 p-3 bg-light-subtle">
                  <p className="text-uppercase small fw-semibold text-primary mb-2">{workout.difficulty}</p>
                  <h3 className="h5">{workout.title}</h3>
                  <p className="mb-2 text-body-secondary">{workout.description}</p>
                  <ul className="list-unstyled mb-0 small">
                    <li><strong>Focus:</strong> {workout.focus}</li>
                    <li><strong>Duration:</strong> {workout.durationMinutes} min</li>
                  </ul>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <p className="mb-0 text-body-secondary">Workout suggestions are coming soon.</p>
        )}
      </div>
    </section>
  )
}

export default Workouts
