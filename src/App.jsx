import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import Dashboard from './pages/DashboardPage'
import UserProfile from './pages/UserProfile'
import IkigaiPage from './pages/IkigaiPage'
import ExplorePage from './pages/ExplorePage'
import ReflectPage from './pages/ReflectPage'
import ActPage from './pages/ActPage'
import TrackProgressPage from './pages/TrackProgressPage'
import QuizPage from './pages/QuizPage'
import CaseStudyWorkspace from './pages/CaseStudyWorkspace'
import CompaniesPage from './pages/CompaniesPage'


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/ikigai" element={<IkigaiPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/reflect" element={<ReflectPage />} />
            <Route path="/act" element={<ActPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/case-studies" element={<CaseStudyWorkspace />} />
            <Route path="/trackprogress" element={<TrackProgressPage />}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App