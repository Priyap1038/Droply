# 🚀 Droply

**Droply** is a modern, full-stack file sharing and management platform built with **Next.js 15**, featuring secure authentication, cloud storage integration, and a beautiful user interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

---

## ✨ Features

- 🔐 **Secure Authentication** - User management powered by Clerk
- 📁 **File Management** - Upload, download, star, and organize files
- 🗂️ **Folder Organization** - Create and navigate through folders
- ☁️ **Cloud Storage** - File storage using ImageKit CDN
- 🗄️ **Database** - PostgreSQL with Drizzle ORM and NeonDB
- 🎨 **Modern UI** - Beautiful interface with HeroUI and Tailwind CSS
- 🌙 **Dark Mode** - Built-in theme switching
- 🐳 **Docker Ready** - Containerized for easy deployment
- ⚡ **Fast & Optimized** - Next.js 15 with Turbopack

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.7
- **UI Components:** HeroUI, NextUI
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 20.x
- **API:** Next.js API Routes
- **Authentication:** Clerk
- **Database:** PostgreSQL (NeonDB)
- **ORM:** Drizzle ORM
- **File Storage:** ImageKit

### DevOps
- **Containerization:** Docker
- **Package Manager:** npm

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Docker** (optional, for containerized deployment) ([Download](https://www.docker.com/))

### Required API Keys

You'll need to create accounts and obtain API keys from:

1. **Clerk** - [https://clerk.com](https://clerk.com) (Authentication)
2. **NeonDB** - [https://neon.tech](https://neon.tech) (PostgreSQL Database)
3. **ImageKit** - [https://imagekit.io](https://imagekit.io) (File Storage)

---

## 🚀 Getting Started

### Option 1: Local Development (Recommended for Development)

#### 1. Clone the Repository

```bash
git clone https://github.com/Priyap1038/Droply.git
cd Droply
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.sample .env.local
```

Edit `.env.local` and add your credentials:

```env
# Database
DATABASE_URL=your_neondb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 4. Setup Database

Push the database schema to your NeonDB instance:

```bash
npm run db:push
```

Optional: Open Drizzle Studio to view your database:

```bash
npm run db:studio
```

#### 5. Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

---

### Option 2: Docker Deployment (Recommended for Production)

#### 1. Clone the Repository

```bash
git clone https://github.com/Priyap1038/Droply.git
cd Droply
```

#### 2. Configure Environment Variables

Create a `.env.local` file with your credentials (see Option 1, Step 3 for details).

#### 3. Build Docker Image

```bash
docker build -t droply:latest .
```

#### 4. Run Docker Container

```bash
docker run -d \
  --name droply \
  -p 3000:3000 \
  --env-file .env.local \
  droply:latest
```

The application will be available at **http://localhost:3000**

#### 5. Docker Management Commands

**View logs:**
```bash
docker logs droply
```

**Stop container:**
```bash
docker stop droply
```

**Start container:**
```bash
docker start droply
```

**Remove container:**
```bash
docker rm droply
```

**Rebuild and restart:**
```bash
docker stop droply
docker rm droply
docker build -t droply:latest .
docker run -d --name droply -p 3000:3000 --env-file .env.local droply:latest
```

---

### Option 3: Docker Compose (Simplified Docker Deployment)

#### 1. Start the Application

```bash
docker-compose up -d
```

#### 2. View Logs

```bash
docker-compose logs -f
```

#### 3. Stop the Application

```bash
docker-compose down
```

#### 4. Rebuild and Restart

```bash
docker-compose up -d --build
```

---

## 📂 Project Structure

```
droply/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── files/           # File management endpoints
│   │   ├── folders/         # Folder management endpoints
│   │   └── imagekit-auth/   # ImageKit authentication
│   ├── dashboard/           # Dashboard page
│   ├── sign-in/            # Sign in page
│   ├── sign-up/            # Sign up page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── providers.tsx       # App providers
├── components/              # React components
│   ├── DashboardContent.tsx
│   ├── FileList.tsx
│   ├── FileUploadForm.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/                     # Utilities and configurations
│   ├── db/                 # Database configuration
│   ├── imagekit.ts         # ImageKit setup
│   └── utils.ts            # Helper functions
├── schemas/                 # Database schemas
├── styles/                  # Global styles
├── public/                  # Static assets
├── drizzle/                # Database migrations
├── .env.local              # Environment variables (create this)
├── .env.sample             # Environment template
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
└── package.json            # Dependencies and scripts
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push database schema to NeonDB |
| `npm run db:studio` | Open Drizzle Studio (database GUI) |
| `npm run db:generate` | Generate database migrations |
| `npm run db:migrate` | Run database migrations |

---

## 🔧 Configuration Guide

### Setting Up Clerk Authentication

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your **Publishable Key** and **Secret Key**
4. Add them to your `.env.local` file
5. Configure redirect URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

### Setting Up NeonDB

1. Go to [https://neon.tech](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string
4. Add it to your `.env.local` as `DATABASE_URL`
5. Run `npm run db:push` to create tables

### Setting Up ImageKit

1. Go to [https://imagekit.io](https://imagekit.io) and create an account
2. Navigate to Developer Options
3. Copy your:
   - Public Key
   - Private Key
   - URL Endpoint
4. Add them to your `.env.local`

---

## 🧪 Testing

### Manual Testing

1. **Authentication Flow:**
   - Visit http://localhost:3000
   - Click "Sign Up" and create an account
   - Verify redirect to dashboard

2. **File Upload:**
   - Navigate to dashboard
   - Click "Upload File"
   - Select a file and upload
   - Verify file appears in the list

3. **File Management:**
   - Star/unstar files
   - Move files to trash
   - Download files
   - Create folders

---

## 🐛 Troubleshooting

### Common Issues

**Issue: `git` command not found**
- **Solution:** Add Git to your system PATH or use the full path: `C:\Program Files\Git\cmd\git.exe`

**Issue: Database connection fails**
- **Solution:** Verify your `DATABASE_URL` in `.env.local` is correct
- Ensure your NeonDB instance is active

**Issue: ImageKit upload fails**
- **Solution:** Check your ImageKit credentials in `.env.local`
- Verify your ImageKit account is active

**Issue: Port 3000 already in use**
- **Solution:** Kill the process using port 3000 or change the port:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Or run on different port
  PORT=3001 npm run dev
  ```

**Issue: Docker build fails**
- **Solution:** Ensure Docker is running and you have sufficient disk space
- Try cleaning Docker cache: `docker system prune -a`

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Deploy with Docker

See **Option 2: Docker Deployment** above for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Priya**
- GitHub: [@Priyap1038](https://github.com/Priyap1038)
- Repository: [Droply](https://github.com/Priyap1038/Droply)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication
- [NeonDB](https://neon.tech/) - Serverless PostgreSQL
- [ImageKit](https://imagekit.io/) - Media Management
- [HeroUI](https://heroui.com/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

## 📧 Support

If you have any questions or need help, please:
- Open an issue on [GitHub](https://github.com/Priyap1038/Droply/issues)
- Check the [Troubleshooting](#-troubleshooting) section

---

**Made with ❤️ by Priya**
