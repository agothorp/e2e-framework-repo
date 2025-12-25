# E2E Framework PoC

A minimal end-to-end test framework using:

- React (Vite) AUT
- Python Flask mock API
- Playwright UI smoke tests
- Extensible structure for API and performance testing (K6)

## Run the AUT
docker compose -f docker/docker-compose.yml up

UI: http://localhost:3000  
API: http://localhost:5000/health

## Run UI smoke tests
npx playwright test tests/ui-smoke
