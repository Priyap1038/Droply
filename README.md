# Droply 🚀

Droply is a **Dockerized file sharing and management platform** built using **Next.js 15**.  
It focuses on secure authentication, scalable backend architecture, and a clean modern UI.

> ⚠️ This project is currently **under active development**.

---

## ✨ Features

- 🔐 Authentication & user management using **Clerk**
- 🐳 Dockerized development & deployment setup
- 📁 File upload & management using **ImageKit**
- 🗂️ Database integration with **Drizzle ORM**
- ☁️ Serverless PostgreSQL using **NeonDB**
- 🎨 Modern UI with **HeroUI** + **Tailwind CSS**
- ⚡ Optimized Next.js App Router architecture

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **HeroUI**
- **Framer Motion**

### Backend
- **Next.js App Router**
- **Clerk Authentication**
- **Drizzle ORM**
- **PostgreSQL (NeonDB)**

### DevOps
- **Docker**
- Docker Compose (if applicable)

---

## 📂 Project Structure

src/
├── app/ # App Router pages & layouts
├── components/ # Reusable UI components
├── lib/ # DB, auth, utilities
├── styles/ # Global styles



---

## 🚀 Getting Started

### Option 1️⃣: Run with Docker (Recommended)

```bash
docker build -t droply .
docker run -p 3000:3000 droply

Option 2️⃣: Run Locally (Without Docker)
1. Clone the repository
git clone https://github.com/your-username/droply.git
cd droply

2. Install dependencies
npm install

3. Environment Variables

Create a .env file in the root directory:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
DATABASE_URL=your_neon_db_url

IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url

4. Push DB schema
npm run db:push

5. Start the dev server
npm run dev


Visit http://localhost:3000

🧠 How It Works

User signs up or logs in using Clerk

Authenticated users can upload files

Files are stored via ImageKit

Metadata is persisted using Drizzle ORM + NeonDB

Application runs inside Docker containers for consistency

