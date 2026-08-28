import { useEffect, useState } from 'react'

import { fetchCollection } from './shared'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
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
            <h2 className="h4 mb-1">Activity feed</h2>
            <p className="text-body-secondary mb-0">Review recent cardio and strength sessions.</p>
          </div>
          <span className="badge text-bg-primary">{items.length} loaded</span>
        </div>
        {error ? (
          <div className="alert alert-warning mb-0">{error}</div>
        ) : items.length ? (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Activity</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Logged</th>
                </tr>
              </thead>
              <tbody>
                {items.map((activity) => (
                  <tr key={activity._id ?? activity.id ?? `${activity.userEmail}-${activity.loggedAt}`}>
                    <td>{activity.user?.name ?? activity.userEmail}</td>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.caloriesBurned}</td>
                    <td>{new Date(activity.loggedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mb-0 text-body-secondary">No activities have been logged yet.</p>
        )}
      </div>
    </section>
  )
}

export default Activities
