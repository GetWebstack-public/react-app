# GWS Playground Frontend

A React-based playground application for testing and experimentation.

## Quick Start

From the project root directory:

```bash
gws up
```

This will start the frontend along with all other services defined in the workspace.

The app will be available at: https://gws-playground-front.gws-playground.local.getwebstack.dev:9443/

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests

## Tech Stack

- React 18
- React Scripts 5.0
- Testing Library

## Docker

```bash
docker build -t gws-playground-front .
docker run -p 3000:3000 gws-playground-front
```
