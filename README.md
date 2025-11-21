<!--
	Blogging-app
	A clean, Bootstrap-styled blogging platform with optional AI content helpers.
-->

# Blogging-app

> A modern, minimal blogging platform built with Node.js, Express, EJS and MongoDB. It includes user authentication, image uploads, a commenting system and optional AI-assisted content generation.

---

## Key Features

- User authentication and profile management
- Create blog posts with optional cover images (file uploads via Multer)
- Comment on posts with author attribution
- Bootstrap-based responsive UI using EJS templates
- AI content generation UI (client + server hooks) to draft posts and optionally include AI-generated images

---

## Quick Demo

1. Sign up / Log in
2. Create a new post via `Add Blog` (upload a cover image if you want)
3. Or use `Generate with AI` to produce a draft, preview it, then insert it into the post form

---

## Getting Started

Prerequisites

- Node.js (v16+ recommended)
- MongoDB connection (local or Atlas)

Install and run:

```powershell
Set-Location -LiteralPath 'd:\web dev practice\Node Practices\Blogging Project 2'
npm install
# create a .env with the variables listed below
node app.js
```

Open http://localhost:PORT (PORT is read from your `.env`, default: 3000 if set so)

---

## Environment Variables

Create a `.env` file at the project root with at least:

```
PORT=3000
MONGO_URL=mongodb+srv://<user>:<password>@cluster0.../dbname
# Add any AI provider keys as server-only variables (do NOT commit .env)
AI_API_KEY=your_api_key_here
```

Security note: Never commit `.env` or secrets to Git — add `.env` to `.gitignore`.
If a secret is accidentally committed, revoke and rotate it immediately.

---

## Project Structure (important files)

- `app.js` — Application entry, routing and middleware
- `routes/` — Express routes (`blog.js`, `user.js`, `aiRoute.js`, etc.)
- `views/` — EJS templates (pages and partials)
- `public/` — Static assets: uploads, styles, profile-photos
- `models/` — Mongoose models for `User`, `Blog`, `Comment`
- `services/` — Helper services (authentication, AI callers)

---

## AI Integration

This app includes a UI to generate blog drafts with AI. For security and reliability:

- Keep AI keys on the server and call provider APIs from a protected server route (examples under `routes/aiRoute.js`).
- The client UI will POST to `/api/ai/generate` and expects JSON `{ success, data }` in response.

If you want me to wire a simple AI server route (OpenAI, Hugging Face, etc.), I can add a safe server-side example that reads a key from `.env` and returns generated content.

---

## Uploads & Images

- Cover images and profile photos are stored in `public/uploads` and `public/profile-photos`.
- The server uses Multer for multipart handling in routes that accept file uploads (e.g. `/blog/add-blog`).

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome`)
3. Make changes, run the app and tests
4. Open a pull request with a clear description

Please avoid committing secrets or large binary files.

---

## Troubleshooting

- Push blocked by GitHub? If GitHub rejects a push due to secret scanning, revoke the leaked key and remove it from the repo history before pushing again.
- Profile image not showing? Verify `public/profile-photos/<filename>` exists and that `app.js` serves static files: `app.use(express.static(path.resolve('./public')))`.

---

## License & Contact

This project is provided as-is for learning and demo purposes. If you want help adding features (AI server route, image generation, CI), open an issue or contact the maintainer.

Happy coding! 🚀
