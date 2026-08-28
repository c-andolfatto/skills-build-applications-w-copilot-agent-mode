import { useEffect, useState } from 'react'

import { fetchCollection } from './shared'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
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
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-body-secondary mb-0">Celebrate top performers and team momentum.</p>
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
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => (
                  <tr key={entry._id ?? entry.id ?? `${entry.userEmail}-${entry.rank}`}>
                    <td>{entry.rank}</td>
                    <td>{entry.user?.name ?? entry.userEmail}</td>
                    <td>{entry.team?.name ?? entry.teamName}</td>
                    <td>{entry.points}</td>
                    <td>{entry.streakDays} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mb-0 text-body-secondary">Leaderboard data will appear after students log activities.</p>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
