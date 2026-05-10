# Bangkok Post Epaper Subscription Flow

Responsive React implementation of a Bangkok Post Epaper subscription journey. The app covers plan selection, mocked payment, promotion code handling, progress tracking, and an account/receipt confirmation screen.

## Tech Stack

- React 19 with TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion
- Vitest and Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test:run
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Development Approach

The implementation is organized around a small set of reusable UI and state primitives:

- Subscription plan state is managed through `SubscriptionProvider` and persisted to `localStorage`.
- Checkout progress is shared through `PaymentStepIndicator`, so Payment and Receipt render the same step model with different current states.
- Payment is intentionally mocked, but it still behaves like a real flow: validation blocks incomplete card details, processing disables the submit button, a loading spinner is shown, and successful payment navigates to the receipt page.
- Receipt data is passed through route state and can fall back to the selected plan if the user refreshes the confirmation page.

## Optimizations

- Route-level code splitting is handled with `React.lazy` and `Suspense`.
- Carousel interval callbacks are stabilized to satisfy hook dependency rules.
- Stored subscription data is shape-validated before the app trusts it.
- Tests cover the critical user paths: plan selection, payment validation, success navigation, receipt rendering, and checkout progress state.

## Mocked Behavior

- Card payment succeeds when all fields are completed.
- QR payment succeeds after confirmation.
- `EPAPER10` applies a 10% promotional discount.
- Receipt order numbers are generated client-side for demo purposes.

## CI

GitHub Actions runs lint, tests, and production build on pushes to `main`/`master` and on pull requests.

## Future Improvements

- Replace mocked payment with a real payment gateway and server-confirmed receipt.
- Store receipt/order details in a backend so confirmation pages survive refreshes without fallback data.
- Add authentication for user to sign up / sign in
- Add stronger form validation for card expiry, masked card display, and promotion code errors.
- Add end-to-end coverage for the full subscription journey.
