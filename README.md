# AllWrite-Ai-Studio
sujeetkumar-29: generate readme file based on my project

Workspace: Collecting workspace informationHere’s a README file for your project, summarizing its features, tech stack, and usage:

```md
# AllWrite Ai Studio

AllWrite Ai Studio is a full-stack AI-powered content creation platform. It enables users to generate articles, blog titles, images, stories, emails, summaries, interview Q&A, portfolio bios, and more using advanced AI tools.

## Features

- **AI Article Writer:** Generate high-quality articles on any topic.
- **Blog Title Generator:** Create catchy blog titles.
- **AI Image Generation:** Produce stunning visuals in various styles.
- **Background/Object Removal:** Edit images with AI.
- **Resume Reviewer:** Get AI-powered resume feedback.
- **Story Generator:** Write engaging stories in multiple genres.
- **Email Writer:** Craft professional emails.
- **Text Summarizer:** Summarize long texts and documents.
- **Interview Q&A Generator:** Prepare for interviews with AI-generated questions and answers.
- **Portfolio Bio Generator:** Create compelling bios for portfolios.
- **Community:** View and like published creations from other users.
- **Premium Plan:** Unlock advanced features with a subscription.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Clerk (authentication), React Router
- **Backend:** Express, Clerk (authentication), Neon/Postgres (database), Cloudinary (image storage), Multer (file uploads), OpenAI (AI models)
- **Deployment:** Vercel

## Project Structure

```
client/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── assets/
  │   └── context/
  ├── public/
  ├── index.html
  ├── package.json
  └── vite.config.js
server/
  ├── configs/
  ├── controllers/
  ├── middlewares/
  ├── routes/
  ├── server.js
  ├── package.json
  └── vercel.json
```

## Getting Started

### Prerequisites

- Node.js
- Vercel CLI (for deployment)
- Cloudinary account (for image features)
- Clerk account (for authentication)
- Neon/Postgres database

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sujeetkumar-29/AllWrite-Ai-Studio.git
   cd AllWrite-Ai-Studio
   ```

2. **Configure environment variables:**
   - Set up `.env` files in both `client/` and `server/` directories with your API keys and secrets.

3. **Install dependencies:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

4. **Run the development servers:**
   - **Frontend:**  
     ```sh
     cd client
     npm run dev
     ```
   - **Backend:**  
     ```sh
     cd server
     npm run server
     ```

5. **Deploy to Vercel:**  
   Follow Vercel documentation for deployment.

## Usage

- Sign up or log in using Clerk authentication.
- Access AI tools from the dashboard.
- Upgrade to premium for advanced features.
- View and interact with community creations.

## License

This project is licensed under the ISC License.

---

