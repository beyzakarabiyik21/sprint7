# Kampüs Etkinlikleri

Fakültedeki seminer, atölye, söyleşi ve yarışmaları listeleyen uygulama. Aynı repoda iki uygulama var: biri gösterir, biri veri verir.

Beyza Karabiyik · 2416501003

**Canlı site:** [https://beyzakarabiyik-frontend.vercel.app](https://beyzakarabiyik-frontend.vercel.app)

| Klasör | Ne | Adres |
| --- | --- | --- |
| [`frontend/`](frontend/) | React + Vite + TypeScript arayüz | `http://localhost:5173` |
| [`backend/`](backend/) | Node + Express REST API | `http://localhost:3000` |

## Çalıştırma

İki ayrı terminalde:

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend endpoint'leri, `PORT` değişkeni ve REST sözleşmesi tablosu için: [backend/README.md](backend/README.md)

## Repo yapısı

```
frontend/              React uygulaması
backend/
  src/
    app.js  server.js
    routes/event-routes.js
    controllers/event-controller.js
    data/events.js
  requests/kampus-api.json
  .env.example  .gitignore
  package.json  README.md
README.md
```
