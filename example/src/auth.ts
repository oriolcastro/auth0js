import { createAuthStore, createAuthHook } from '@gigapipe/auth0js'

export const authStore = createAuthStore({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  useRefreshTokens: true,
  useRefreshTokensFallback: true,
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: `${window.location.origin}/auth`,
  },
})

export const useAuth = createAuthHook(authStore)
