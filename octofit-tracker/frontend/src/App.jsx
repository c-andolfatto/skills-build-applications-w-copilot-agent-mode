import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'

import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

const navItems = [
  ['/', 'Profiles'],
  ['/teams', 'Teams'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/workouts', 'Workouts'],
]

function App() {
  return (
    <BrowserRouter>
      <div className="bg-body-tertiary min-vh-100">
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
          <div className="container py-2">
            <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
              <img src={logo} alt="OctoFit Tracker logo" width="40" height="40" className="rounded-circle" />
              OctoFit Tracker
            </NavLink>
            <div className="d-flex flex-wrap gap-2">
              {navItems.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <main className="container py-4 py-lg-5">
          <section className="row g-4 align-items-center mb-4">
            <div className="col-lg-7">
              <p className="text-uppercase fw-semibold text-primary mb-2">Mergington High School fitness app</p>
              <h1 className="display-6 fw-bold mb-3">Track progress, build teams, and keep students moving.</h1>
              <p className="lead text-body-secondary mb-0">
                Browse profiles, review activity logs, and share workout suggestions from one lightweight dashboard.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h5">API connection</h2>
                  <p className="mb-2 text-body-secondary">Frontend requests are sent to:</p>
                  <code>{apiBaseUrl}</code>
                  {!codespaceName ? (
                    <p className="small text-body-secondary mt-3 mb-0">
                      Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the GitHub Codespaces URL.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
