# Agentic Job Scraper

React + Vite frontend for an Agentic Job Scraper.

## Project structure

```text
src/
├── components/
│   ├── AgentLog.jsx
│   ├── CVScanner.jsx
│   ├── Hero.jsx
│   ├── JobTargetForm.jsx
│   ├── ScanResult.jsx
│   ├── Navbar.jsx
│   └── TelegramButton.jsx
├── constants/
│   └── config.js
├── services/
│   └── api.js
├── utils/
│   └── fileValidation.js
├── App.jsx
├── index.css
└── main.jsx
```

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Backend API

Create `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

The `JobTargetForm.jsx` component sends the request directly to:

```text
POST /api/register-cv
Content-Type: multipart/form-data

role = AI Automation
cv   = resume.pdf
```

Expected successful response:

```json
{
  "success": true,
  "message": "CV successfully parsed and stored!",
  "target_roles": ["RPA Developer", "Python Developer"],
  "unique_code": "da976890",
  "telegram_link": "https://t.me/AGENT_JOB_V1_BOT?start=da976890"
}
```

The response is displayed by `ScanResult.jsx`. The Telegram button is rendered **only after a successful API response and when `telegram_link` exists**. `App.jsx` only coordinates the scanner animation state; it does not call the API.

If the API fails, the scanner goes to error state and the Telegram button stays hidden.

## Production

```bash
npm run build
npm run preview
```

## Notes

The API call, loading state, validation feedback, and response state are handled inside `src/components/JobTargetForm.jsx`, as requested. The API response presentation is isolated in `src/components/ScanResult.jsx`. Make sure the multipart field names (`role` and `cv`) match the FastAPI endpoint.
