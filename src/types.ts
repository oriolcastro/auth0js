/**
 * The state of the application before the user was redirected to the login page.
 */
export type AppState = {
  returnTo?: string
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
