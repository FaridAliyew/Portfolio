# Farid Aliyev — Creative Developer Portfolio

An ultra-modern, high-performance creative developer portfolio designed with an editorial monochrome aesthetic, kinetic typography, scroll-coupled interactions, and Awwwards-style cinematic page transitions.

---

## ✨ Features

- **Kinetic Hero Section**: High-impact marquee typography with dual-direction motion, crisp cut-out portrait integration, and smooth floating tech stack switcher (Next.js, TypeScript, React, JavaScript).
- **Interactive About Section**: Scroll-driven word-by-word reading scrub animation that progressively reveals the narrative from muted ghost tones to bold solid text.
- **Alternating Skills Stream**: 
  - Massive, sticky centered **"SKILLS"** watermark.
  - Alternating staggered project cards that rise from bottom to top.
  - Seamless **Grayscale $\to$ Natural Full Color** hover transitions.
  - Dynamic side-switching descriptions with tech stack badges.
- **Awwwards Stepped Shutter Wipe Transition**:
  - 8-column staggered black shutter wave that sweeps across the screen in a diagonal staircase pattern.
  - Flawless zero-flash state locking.
- **Dedicated Project Detail Views**: Full editorial case study page per project with responsive media showcase, project overview, tech stack highlights, and live website launch triggers.
- **Scroll-Speed Coupled Dark Mode Footer**:
  - The background color shifts dynamically from pure white (`#ffffff`) to deep black (`#09090b`) directly tied to the user's scroll velocity.
  - Statement branding, direct social links (LinkedIn, GitHub, Instagram), live status indicator, and smooth back-to-top button.
- **Smooth Anchor Navigation**: Fluid cross-section navigation with automatic sticky offset handling.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Modern CSS3 (Custom Variables, Flexbox, CSS Grid, Transitions)
- **Icons**: Lucide React
- **Containerization**: Docker (Multi-stage build), Docker Compose
- **Web Server**: Nginx (Alpine Linux) with Gzip compression and static asset caching
- **CI/CD**: GitHub Actions (Build, verification, and Docker validation)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm (or yarn / pnpm)
- Docker & Docker Compose (optional, for containerized run)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FaridAliyew/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🐳 Docker Deployment

The project includes a production-ready, multi-stage `Dockerfile` and `docker-compose.yml` that compiles the React app and serves it via an optimized Nginx web server.

### Run with Docker Compose

```bash
# Build and start container in detached mode
docker compose up -d --build

# View container status
docker compose ps

# View container logs
docker compose logs -f

# Stop container
docker compose down
```

The application will be accessible at: **[http://localhost:3000](http://localhost:3000)**

### Run with Docker CLI directly

```bash
# Build Docker image
docker build -t farid-portfolio:latest .

# Run container on port 3000
docker run -d -p 3000:80 --name farid-portfolio farid-portfolio:latest
```

---

## 🔄 CI/CD Pipeline

Automated continuous integration is configured via **GitHub Actions** (`.github/workflows/ci-cd.yml`):

1. **Build & Verify Job**:
   - Triggers on every `push` and `pull_request` to `main` / `master`.
   - Sets up Node.js 20 with npm caching.
   - Installs dependencies cleanly using `npm ci`.
   - Runs `npm run build` to ensure the production bundle builds without errors.
   - Archives the production `dist/` bundle as a build artifact.

2. **Docker Build & Smoke Test Job**:
   - Validates that the multi-stage Docker image builds successfully using Docker Buildx and GitHub Actions caching.

---

## 📁 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions CI/CD pipeline
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # Optimized images and portraits
│   │   ├── projects/             # Project screenshots
│   │   ├── me-cutout.png         # Studio portrait cutout
│   │   └── me2.png               # About section backdrop
│   ├── components/
│   │   ├── Navbar.jsx            # Fixed frosted glass navigation
│   │   ├── Navbar.css
│   │   ├── HeroSection.jsx       # Kinetic marquee & portrait hero
│   │   ├── HeroSection.css
│   │   ├── AboutSection.jsx      # Scroll-driven word scrub reveal
│   │   ├── AboutSection.css
│   │   ├── SkillsSection.jsx     # Interactive project showcase stream
│   │   ├── SkillsSection.css
│   │   ├── ProjectDetailPage.jsx # Editorial case study detail view
│   │   ├── ProjectDetailPage.css
│   │   ├── PageTransitionCurtain.jsx # 8-column stepped shutter wipe
│   │   ├── PageTransitionCurtain.css
│   │   ├── Footer.jsx            # Dynamic white-to-black scroll footer
│   │   └── Footer.css
│   ├── App.jsx                   # Root coordinator & view state manager
│   ├── index.css                 # Global styles, variables & CSS reset
│   └── main.jsx                  # Application entry point
├── .dockerignore
├── docker-compose.yml            # One-command container orchestration
├── Dockerfile                    # Multi-stage production container build
├── nginx.conf                    # Production SPA Nginx configuration
├── package.json
└── README.md
```

---

## 🌐 Featured Projects

1. **COOKIE** — [cookie-one-orpin.vercel.app](https://cookie-one-orpin.vercel.app)
2. **QUOTEFLOW** — [quoteflow.website](https://quoteflow.website)
3. **LUXE** — [luxe-three-lilac.vercel.app](https://luxe-three-lilac.vercel.app)
4. **GIRLSCODE** — [girlscode.az](https://girlscode.az)
5. **SƏBAT** — [sabat.az](https://sabat.az)

---

## 📬 Contact & Socials

- **Developer**: Farid Aliyev
- **LinkedIn**: [linkedin.com/in/farid-aliyev-56862430b](https://www.linkedin.com/in/farid-aliyev-56862430b/)
- **GitHub**: [@FaridAliyew](https://github.com/FaridAliyew)
- **Instagram**: [@4l1yew](https://www.instagram.com/4l1yew/)

---

© 2026 Farid Aliyev. All rights reserved.
