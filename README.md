AllWrite AI Studio

AllWrite AI Studio is a full-stack AI content creation platform designed to help users generate, refine, and publish high-quality content using AI-powered tools. The application combines a modern React frontend with an Express backend to deliver a polished creator experience for articles, marketing copy, visuals, resumes, interviews, and more.

## Features

- AI article generator for long-form writing
- Blog title generator for content ideation
- Story generator for creative writing
- Email writer for professional communication
- Text summarizer for quick content digestion
- Interview Q&A generator for prep and learning
- Portfolio bio generator for personal branding
- Resume reviewer for feedback and optimization
- AI image generation workflow
- Background and object removal tools for image editing
- Community page for browsing user-created work
- Premium plan experience for advanced access

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Clerk authentication
- Lucide icons
- Axios and React Markdown

### Backend
- Node.js + Express
- Clerk middleware for auth protection
- OpenAI API integration
- Cloudinary for media management
- Multer for file uploads
- Neon/Postgres via serverless database client
- dotenv for environment configuration

## Project Structure

```bash
AllWrite-Ai-Studio/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
├── README.md
└── package-lock.json
```

## Prerequisites

Before running the project locally, make sure you have:

- Node.js 18+
- npm
- A Clerk account and Clerk API keys
- An OpenAI API key
- A Cloudinary account
- A Neon/Postgres database connection string

## Environment Variables

Create a `.env` file in the `server/` directory with values similar to:

```env
PORT=3000
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
DATABASE_URL=your_neon_connection_string
```

For the frontend, configure any public Vite or Clerk environment values needed by the client app, such as:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sujeetkumar-29/AllWrite-Ai-Studio.git
cd AllWrite-Ai-Studio
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Run the project

Start the backend server:

```bash
cd server
npm run server
```

Start the frontend:

```bash
cd client
npm run dev
```

The frontend typically runs on `http://localhost:5173`, while the backend serves API traffic on `http://localhost:3000`.

## Usage

1. Sign in using Clerk authentication.
2. Open the dashboard and choose an AI tool.
3. Enter your prompt, content, or upload images as needed.
4. Generate content, review the result, and refine it.
5. Save or share creations through the community experience.

## API and Server Notes

The backend exposes protected routes under `/api` and uses Clerk auth middleware to secure features. Media uploads are handled with Multer and Cloudinary, while AI generation requests are sent to OpenAI-powered flows.

## Deployment

This project is structured for deployment on platforms such as Vercel for the frontend and a Node-enabled hosting environment for the backend.

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome. If you want to improve functionality, add new AI tools, or enhance the user experience, feel free to open a pull request or work from a feature branch.