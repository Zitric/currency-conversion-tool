export const API_URL = '/api/v1'

// Throws "<message> (<status>)" when the request failed,
// e.g. "Failed to fetch currencies (401)"
export function assertOk(response: Response, message: string) {
  if (!response.ok) {
    throw new Error(`${message} (${response.status})`)
  }
}
