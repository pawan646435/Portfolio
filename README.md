# The Codex — Pawan Kumar's Portfolio

A premium, immersive portfolio experience inspired by Renaissance art and the
Italian codex tradition. Built with Next.js, Three.js, and Framer Motion.

**Live:** [portfolio-indol-chi-66.vercel.app](https://portfolio-indol-chi-66.vercel.app)

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

## AI Chatbot

A floating chat widget (bottom-right, launcher = Pawan's portrait) lets
visitors ask about his background, skills, and projects. Answers are
grounded in `lib/portfolio-knowledge.ts` and streamed from Groq via the
Vercel AI SDK.

- `app/api/chat/route.ts` — streaming API route (`ai` + `@ai-sdk/groq`)
- `lib/portfolio-knowledge.ts` — the knowledge base / system prompt
- `components/ui/ChatWidget.tsx` — the widget, mounted in `AppProviders.tsx`

Requires a `GROQ_API_KEY` in `.env.local` (and in Vercel project
settings for deployment).

## Deployment

Deployed on Vercel: [portfolio-indol-chi-66.vercel.app](https://portfolio-indol-chi-66.vercel.app)

Connected to the GitHub repo — every push to `main` redeploys automatically.

## Contact

Pawan Kumar
GitHub: [github.com/pawan646435](https://github.com/pawan646435)
LinkedIn: [linkedin.com/in/pawan646435](https://www.linkedin.com/in/pawan646435/)
Email: [pawankumar646435@gmail.com](mailto:pawankumar646435@gmail.com)
