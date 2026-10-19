# Currency Conversion Tool

A small currency converter in the spirit of Google's, built with React, TypeScript and Vite on top of the [CurrencyBeacon](https://currencybeacon.com) API.

## Getting started

**Prerequisites:** Node.js 22+, pnpm, and a free CurrencyBeacon API key (sign up at https://currencybeacon.com; the key is on the dashboard under **API Token Information**).

```bash
git clone https://github.com/Zitric/currency-conversion-tool.git
cd currency-conversion-tool
pnpm install
cp .env.example .env   # then set VITE_CURRENCY_BEACON_API_KEY
pnpm dev               # open the URL Vite prints (default http://localhost:5173)
```

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm test` | Run the unit tests (Vitest + Testing Library) |
| `pnpm lint` / `pnpm lint:fix` | Lint with Biome / apply safe fixes |
| `pnpm build` | Type-check and build |

## Project structure
```
src/
├── api/          # Fetch functions for /currencies and /convert, with their tests
├── hooks/        # TanStack Query hooks wrapping the API calls
├── components/   # AmountInput, CurrencySelect, CurrencyOptions, ConversionResult
├── test/         # Test setup and a fetch mock helper
└── App.tsx       # Holds the form state and composes the components
```

## Decisions and assumptions

- **API proxy.** CurrencyBeacon sends no CORS headers, so the browser can't call it directly. Vite's dev server proxies `/api/*` to `https://api.currencybeacon.com`, which keeps this a plain front-end project with no backend to run. See *Running in production* for what this means outside local development.
- **Reading `response`.** Both endpoints return their data twice: inside `response` and again at the top level. The app reads only `response` because it's the documented part (the top-level copy looks like a backwards-compatibility leftover that could be removed), it has the same shape on every endpoint, errors follow it too, and in `/currencies` the top-level copy is an object keyed `"0"`, `"1"`… rather than an array. Currencies use `short_code` (e.g. `EUR`) as the option value, since that's what `/convert` expects.
- **TanStack Query.** Handles caching, loading and error states and request de-duplication instead of hand-rolled `useEffect`s. The currency list is cached for the whole session (`staleTime: Infinity`) and shared by both selects, so it's fetched once. The conversion query only runs once both currencies are selected and the amount is greater than zero.
- **Composition.** One `CurrencySelect` is reused for "From" and "To". `App` owns the state and passes it down.
- **User feedback.** Loading text while currencies and conversions load, errors announced with `role="alert"`, and the result shown in an `<output>` formatted with `Intl.NumberFormat` in the target currency.
- **Tooling.** Biome for linting and formatting, Vitest + Testing Library for tests, with `fetch` mocked so tests never hit the real API.

## Running in production

As it stands, the app is meant for local use only, for two reasons:

1. **The `/api` routes only exist in Vite's dev/preview server.** `pnpm build` produces static files, so on a static host (Vercel, Netlify, GitHub Pages…) `/api/v1/*` would return a 404.
2. **The API key reaches the browser.** Anything prefixed `VITE_` is bundled into the client JavaScript, so anyone could read it in DevTools and use the quota.

The fix is a small serverless function on the host that does what the Vite proxy does and adds the key server-side:

```
Browser ──> my-site.com/api/v1/convert?...   (no key)
                │  serverless function
                └──> api.currencybeacon.com/v1/convert?... + Authorization: Bearer <secret key>
```

That means: adding the function, removing the `Authorization` header from the client fetches, renaming the variable without the `VITE_` prefix (set in the host's dashboard), and having the dev proxy add the key too, so local and production behave the same. Components, hooks and most tests wouldn't change, because the app already calls a relative `/api/...` path.

A host "rewrite" rule would fix the 404 without code, but the key would still be exposed, so I wouldn't use it in production.

## What I'd do with more time
- Make it deployable: move the API key behind a serverless proxy (see *Running in production*).
- Debounce the amount input, so the API isn't called on every keystroke (the free plan allows 5,000 requests a month).
- Integration and end-to-end tests (Playwright) covering the full flow: select currencies, type an amount, see the result.
- A searchable currency picker, since a plain `<select>` with 150+ options is hard to scan.
- A swap button and two-way conversion, like Google's.
- Clearer error messages (missing API key, rate limit reached) and no retries on 4xx errors.