import { RedirectLoginOptions } from '@auth0/auth0-spa-js'

import { type AuthStore } from './authStore'
import { defaultReturnTo } from './utils'

type LoaderWithAuthOptions = {
  /**
   * Zustand store that contains all the state and the different auth methods. Created with `createAuthStore`
   *
   * ```js
   * const authStore = createAuthStore({
   *  domain: import.meta.env.VITE_AUTH0_DOMAIN,
   *  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
   *  useRefreshTokens: true,
   *  authorizationParams: {
   *    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
   *    redirect_uri: window.location.origin,
   *  },
   * }
   * ```
   */
  authStore: AuthStore
  /**
   * ```js
   *  await loaderWithAuth({
   *    loginOptions: {
   *      appState: {
   *        customProp: 'foo',
   *      },
   *    },
   *  })
   * ```
   *
   * Pass additional login options, like extra `appState` to the login page.
   * This will be merged with the `returnTo` option used by the `onRedirectCallback` handler.
   */
  loginOptions?: RedirectLoginOptions
  /**
   * ```js
   * await loaderWithAuth({ returnTo: () => window.location.hash.substr(1) })
   * ```
   * or
   *
   * ```js
   * const returnTo = new URL(request.url).pathname
   * await loaderWithAuth({ returnTo })
   * ```
   *
   * Add a path for the `onRedirectCallback` handler to return the user to after login.
   */
  returnTo?: string | (() => string)
}

/**
 * ```js
 *  loader: async ({ request }: LoaderFunctionArgs) => {
 *    const returnTo = new URL(request.url).pathname
 *    await loaderWithAuth({ useAuth, returnTo });
 *    return json(SOME_DATA)
 *  }
 * ```
 *
 * When you call the function inside a route loader and an anonymous user is tring to access that route
 * they will be redirected to the login page and returned to the page they we're redirected from after login.
 */
export async function loaderWithAuth(options: LoaderWithAuthOptions) {
  const { authStore, loginOptions, returnTo = defaultReturnTo } = options
  const { isAuthenticated, loginWithRedirect } = authStore.getState()

  if (!isAuthenticated) {
    const opts = {
      ...loginOptions,
      appState: {
        ...(loginOptions && loginOptions.appState),
        returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
      },
    }
    await loginWithRedirect(opts)
  }
}
