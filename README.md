# The Codex — Pawan Kumar's Portfolio

A premium, immersive portfolio experience inspired by Renaissance art and the
Italian codex tradition. Built with Next.js, Three.js, and Framer Motion.

## Experience

- **Cinematic Entry Gate** — enter the codex with a conscious choice
- **Horizontal Gallery Navigation** — five rooms, each a chapter (Identity,
  Story, Works, Arsenal, Dialogue)
- **Gold Spotlight Cursor** — a torch that reveals content from darkness
- **3D Golden Spiral** — φ = 1.618, the mathematical soul of the portfolio
- **Renaissance Typography** — Cormorant Garamond meets Space Grotesk
- **Ambient Audio** — optional atmospheric soundtrack
- **Mobile Codex** — a separate vertical reading experience for phones

## Built With

- **Framework:** Next.js 16 (App Router, TypeScript)
- **3D:** Three.js via `@react-three/fiber` + `@react-three/drei`
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **Audio:** Howler.js
- **Particles:** `@tsparticles/react`
- **Deployment:** Vercel

## Structure

```text
app/
├── layout.tsx        # root layout, fonts, metadata, providers
├── page.tsx           # entry point, renders CodexExperience
└── globals.css        # CSS variables, base styles

components/
├── 3d/                # Three.js canvas components (golden spiral, torus)
├── gates/              # entry gate
├── mobile/             # complete mobile experience + mobile rooms
├── rooms/              # desktop gallery rooms
└── ui/                 # shared UI (cursor, spotlight, room engine, audio…)

lib/
├── context/AppContext.tsx  # global app state (room, entry, audio)
├── data.ts                  # portfolio content — profile, projects, skills
├── hooks.ts                  # device/media-query/reduced-motion hooks
└── spotlight.ts                # spotlight cursor math
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Ambient Audio

Add a royalty-free atmospheric/classical track to:

```text
public/audio/ambient.mp3
```

Recommended sources: Musopen.org, Free Music Archive, or public-domain
recordings such as Erik Satie's Gymnopédies.

## Deployment

Deployed on Vercel. Connect the GitHub repo and deploy:

1. Push to GitHub
2. Import the repo on vercel.com
3. Framework: Next.js (auto-detected)
4. Build command: `npm run build` (auto)
5. Deploy

## Contact

Pawan Kumar
GitHub: [github.com/pawan646435](https://github.com/pawan646435)
LinkedIn: [linkedin.com/in/pawan646435](https://www.linkedin.com/in/pawan646435/)
Email: [pawankumar646435@gmail.com](mailto:pawankumar646435@gmail.com)
