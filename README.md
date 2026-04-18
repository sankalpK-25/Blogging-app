# Blogging Project 2

A full-stack blogging application built with Node.js, Express, MongoDB, and EJS. Users can sign up, log in, publish blog posts with cover images, comment on posts, and generate blog content with AI before publishing.

## Features

- User signup and login with JWT-based authentication stored in cookies
- Profile image upload during registration
- Create blog posts with optional cover images
- Support for both plain-text and structured blog content
- Comment system for individual blog posts
- AI-powered blog generation using the Hugging Face Inference API
- Server-rendered UI with EJS templates and static asset support

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS
- Multer
- JSON Web Tokens
- Hugging Face Inference API

## Project Structure

```text
.
|-- app.js
|-- controllers/
|-- middlewares/
|-- models/
|-- public/
|-- routes/
|-- services/
|-- views/
|-- package.json
```

## Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
API_KEY=your_huggingface_api_key
```

## Installation

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Start the app normally:

```bash
npm start
```

Then open `http://localhost:3000` in your browser, or the port you set in `.env`.

## Main Routes

### Page Routes

- `GET /signup` - signup page
- `GET /login` - login page
- `GET /` - homepage with published blogs
- `GET /add-blogs` - create a new blog
- `GET /add-blogs/generate-with-ai` - AI blog generation page
- `GET /blog/:id` - single blog page with comments

### Auth Routes

- `POST /user/signup` - register a new user
- `POST /user/login` - log in and receive auth cookie
- `GET /user/logout` - log out current user

### Blog Routes

- `POST /blog/add-blog` - publish a blog post
- `POST /blog/:id/comment` - add a comment to a blog

### AI Route

- `POST /api/ai/generate` - generate structured blog content from a prompt

## How AI Blog Generation Works

The AI page sends a prompt to the backend, which calls the Hugging Face Inference API and expects a JSON response in this format:

```json
{
  "title": "string",
  "introduction": "string",
  "sections": [
    {
      "heading": "string",
      "content": "string"
    }
  ],
  "conclusion": "string"
}
```

That generated content can then be inserted directly into a new post and saved to MongoDB.

## Notes

- Uploaded cover images are stored in `public/uploads`
- Uploaded profile images are stored in `public/profile-photos`
- Authentication state is read from the `token` cookie
- `npm test` is currently a placeholder and does not run automated tests yet

## Author

Sankalp
