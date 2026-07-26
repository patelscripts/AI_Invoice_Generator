# AI Invoice Generator

A full-stack invoice management app built on the MERN stack, with Google Gemini AI woven in to speed up the boring parts of invoicing — parsing raw text into a ready-to-edit invoice, writing payment reminder emails, and generating quick financial insights for your dashboard.

## Features

- **Create, edit, and manage invoices** — clients, itemized line items, tax, due dates, and payment terms
- **Create Invoice with AI** — paste any text (an email, a note, a quote) and let Gemini extract client details and line items automatically
- **AI-generated payment reminders** — one click to draft a polite, professional reminder email for an overdue invoice
- **AI dashboard insights** — short, actionable summaries of your revenue, outstanding payments, and invoice activity
- **Status tracking** — mark invoices Paid / Unpaid, filter and search by client or invoice number
- **Print / Export to PDF** — clean, print-ready invoice layout
- **Authentication** — JWT-based login and signup, protected routes
- **Dockerized** — backend and frontend each run in their own container via Docker Compose for local development

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini API (`@google/genai`)

**DevOps**
- Docker & Docker Compose (local development)
- Render (backend hosting)
- Vercel (frontend hosting)

## Project Structure

```
Aiinvoicegenerator/
├── docker-compose.yml
├── Backend/
│   ├── Dockerfile
│   ├── server.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
└── Frontend/
    ├── Dockerfile
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   └── utils/
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v20+)
- MongoDB (local or Atlas)
- A Google Gemini API key
- Docker (optional, for containerized setup)

### 1. Clone the repo

```bash
git clone https://github.com/patelscripts/AI_Invoice_Generator.git
cd AI_Invoice_Generator
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run it:

```bash
npm start
```

### 3. Frontend setup

```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/` (optional, for pointing at a deployed backend):

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run it:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`, talking to the backend at `http://localhost:8000`.

### 4. Or run everything with Docker Compose

From the project root:

```bash
docker-compose up --build
```

This builds and starts both the backend (`:8000`) and frontend (`:5173`) containers.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/auth/me` | Get the logged-in user's profile |
| PUT | `/api/auth/me` | Update profile |
| GET | `/api/invoices` | Get all invoices for the logged-in user |
| POST | `/api/invoices` | Create a new invoice |
| GET | `/api/invoices/:id` | Get a single invoice |
| PUT | `/api/invoices/:id` | Update an invoice |
| DELETE | `/api/invoices/:id` | Delete an invoice |
| POST | `/api/ai/parse-text` | Extract invoice data from free-form text |
| POST | `/api/ai/generate-reminder` | Generate a reminder email for an invoice |
| GET | `/api/ai/dashboard-summary` | Get AI-generated financial insights |

## Deployment

- **Backend** is deployed on [Render](https://render.com) as a Docker web service (Root Directory: `Backend`, Dockerfile Path: `./Dockerfile`)
- **Frontend** is deployed on [Vercel](https://vercel.com) (Root Directory: `Frontend`), with `VITE_API_BASE_URL` pointed at the Render backend URL

## Roadmap / Ideas

- [ ] Recurring invoices
- [ ] Multi-currency support
- [ ] Email delivery of invoices/reminders directly from the app
- [ ] Client-facing payment links

## Author

**Navneet Patel**
GitHub: [@patelscripts](https://github.com/patelscripts)
