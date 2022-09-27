import { Outlet, useNavigate } from 'react-router-dom'
import { Nav } from './Nav'
import { AuthProvider } from '@gigapipe/auth0-react'
import { authStore } from './auth'

export default function Root() {
  const navigate = useNavigate()
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }
  return (
    <>
      <AuthProvider onRedirectCallback={onRedirectCallback} authStore={authStore} />
      <Nav />
      <Outlet />
    </>
  )
}
