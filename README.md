# Beyond Limits FA | Nigerian Youth Development Program

Beyond Limits Football Academy is a youth development programme based in Ikenne-Remo, Ogun State, Nigeria, focused on nurturing talent, creating opportunities, and empowering the next generation of footballers on and off the pitch.

## Purpose

This platform was built to digitize player development, improve talent tracking, and support structured football training programs in Nigeria.

---

## Features

- Team registration and management
- Player registration and management
- Competitions management
- Admin dashboard for academy staff
- Performance analytics and reports
- News & Blog system
- Highlights reels management

---

## Tech Stack

- Next.js
- TypeScript
- AWS Amplify (Hosting / Backend services)
- Cloudinary (Media storage & management)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Michicko/beyond-limits_fa.git
cd beyond-limits-fa
```

## Install dependencies:

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

## Environment Variables

Create a .env file in the root directory:

```env
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## Project Structure

```bash
beyond-limits_fa/
  ├── .amplify/
  ├── .next/
  ├── amplify/
  ├── app/
  ├── components/
  ├── config/
  ├── contexts/
  ├── hooks/
  ├── lib/
  ├── providers/
  ├── public/
  ├── types/
  ├── utils/
  ├── middleware.ts
  ├── next-env.d.ts
  ├── next-sitemap.config.js
  ├── next.config.js
  └── app.ts
```

## License

This project is proprietary software owned by Beyond Limits Football Academy.

See the [LICENSE](./LICENSE) file for full details.

## Deployment

This project is deployed using AWS Amplify.

## Live Demo

https://beyondlimitsfa.com/
