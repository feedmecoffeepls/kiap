# Next.js Website README

This README provides an overview of the Next.js website hosted at [https://kiap.vercel.app/](https://kiap.vercel.app/). The website utilizes several technologies and libraries, including Drizzle ORM, Neon DB, TanStack Query, Zustand, and Clerk.

## Technologies Used

- [Next.js](https://nextjs.org/): Next.js is a React framework that enables server-side rendering and other powerful features for building modern web applications.
- [Drizzle ORM](https://github.com/drizzle-orm/drizzle-orm): Drizzle ORM is an Object-Relational Mapping library for JavaScript, providing an easy way to interact with databases.
- [Neon DB](https://github.com/neondb/neondb): Neon DB is a lightweight, schema-less database for Node.js applications.
- [TanStack Query](https://github.com/tannerlinsley/react-query): TanStack Query is a powerful data-fetching and caching library for React applications.
- [Zustand](https://github.com/pmndrs/zustand): Zustand is a small, fast, and scalable state management library for React.
- [Clerk](https://clerk.dev/): Clerk is an authentication and user management service that simplifies the process of adding user accounts to your application.
- [Upload Thing](https://uploadthing.com/): Image upload host. Made famous by Theo (Youtuber).
- [Tailwind](https://tailwindcss.com/): Tailwind.


## Assumptions made / Decisions taken

### Bid
- Can't set a new bid if a bid that exceeds the selling price already exists
- Can bid higher than the selling price
- Only able to accept the highest bid
- Only show the highest bid

### Selling
- Buying immediately delists the item off the platform

### Image upload
- Upload a gallery of images, one image (most recently uploaded) is used as banner image
- Removed ability to select banner image due to some drizzle-orm quirks that needed time to resolve
- Chose not to use @vercel/blob due to 500mb limit on the free tier

### Auth
- No validation, but would have opted for Google auth if given more time

### Neon + Drizzle
- Chose this stack instead of Supabase for the Schema + Typescript support (Seems to have slightly better support)

## Note
- Schema is at db/schema.ts


## Getting Started

To run the website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Set all .env variables (rename .env.example to .env.local, etc)
5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)