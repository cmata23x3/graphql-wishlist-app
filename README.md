# Wishlist Application

## Motivation
This application was made to have more practice with more modern full stack web tooling.

Major tools used:
* GraphQL
    * Prisma
    * Nexus
    * Genql
* NextJS
* TailwindCSS

The entire project is strongly typed from the backend API to the frontend UI code. This was a good way to ensure that types were propagated from their definitions to their use.

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Development

In order to generate Nexus types and GraphQL schema, run
```bash
npm run generate:nexus
```

In order to generate GraphQL types used in the frontend, run
```bash
npm run generate:genql
```

Useful to run both commands at the same time, run
```bash
npm run generate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
