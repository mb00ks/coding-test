
# 🧠 InterOpera Coding Test – Full Stack App (Next.js + FastAPI + OpenAI)

This is a full-stack coding challenge project built using:

- **Backend**: FastAPI (Python) + OpenAI API (Chat)
- **Frontend**: Next.js 13.1.6 (TypeScript, App Router not used)
- **API**: `/api/sales-reps` (returns sales data), `/api/ai` (responds to user questions)

---

## 🚀 Features

### ✅ Frontend (Next.js)
- Server-side rendered (SSR) pages using `getServerSideProps`
- Clean, responsive UI (no client-side React hooks)
- Interactive AI form (POST) with server-rendered result
- Display of sales representatives, role, skills, deals, and status

### ✅ Backend (FastAPI)
- FastAPI with 2 endpoints:
  - `/api/sales-reps`: Serves sales reps data from JSON
  - `/api/ai`: Sends user questions to OpenAI and returns answers
- CORS enabled
- Fully documented with OpenAPI (`/docs`)

---

## 📦 Tech Stack
- FastAPI
- OpenAI (gpt-3.5-turbo)
- Next.js 13.1.6
- Node.js 16.15.1 compatible (Next.js version pinned)
- TypeScript (optional typing)
- CSS modules

---

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── dummyData.json
│   └── .env
├── frontend/
│   ├── pages/
│   │   ├── index.tsx
│   │   └── ai.tsx
│   └── styles/
│       └── Home.module.css
```

---

## ▶️ Getting Started

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

- Open: http://localhost:8000/docs for API docs

> Make sure to add your OpenAI API key in `.env`:
```
OPENAI_API_KEY=sk-xxxxxxxx
```

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

- Visit: http://localhost:3000

---

## 💬 Ask AI Demo

Go to `/ai`, type a question → backend sends it to OpenAI and shows the answer using server-rendered result.

---

## 📝 Notes

- Make sure your OpenAI account has an active billing setup.
- This project works with Node.js **16.15.1**, thanks to Next.js **13.1.6**.
- Prevents crashes if OpenAI returns errors or quota issues.

---

## ✅ Submission Checklist

- [x] REST API with FastAPI
- [x] SSR Next.js frontend
- [x] AI response using OpenAI
- [x] Clean, well-documented code
- [x] Compatible with Node 16
