import './App.css'
import Bussiness from './BussinessOwner/component/Page/Bussiness'
<<<<<<< HEAD
import OnboardingPage from './OnboardingPage/OnboardingPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/bussiness"
          element={
            <RequireAuth roles={[
              'restaurant_owner',
              'restaurant',
              'owner',
              'restaurant-admin'
            ]}>
              <Bussiness />
            </RequireAuth>
          }
        />
  <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
=======
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
  <BrowserRouter>
    <Bussiness />
  </BrowserRouter>
    </>
>>>>>>> feature/bussinessPage
  )
}

export default App
