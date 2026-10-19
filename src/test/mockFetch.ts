import { vi } from 'vitest'

// Makes every fetch() call answer with this body and status
export function mockFetch(body: unknown, status = 200) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    Response.json(body, { status }),
  )
}
