# NEXUS Worlds / Ready Player Two

A living AI-powered world simulation project.

The long-term goal is to build a visual AI universe where agents and players can create worlds together. The first working version should prove the core loop: AI citizens move, talk, remember, react to events, create new agents, and evolve a planet from Day One into a futuristic civilisation.

## Current Build Direction

This repository is intended to start from the AI Town style architecture:

- React / TypeScript frontend
- PixiJS-style visual world
- Convex backend for state, agents, memories and simulation
- OpenAI or Ollama-compatible model layer
- Agent systems for conversation, memory, goals and world evolution

## Core Systems Planned

- AI citizen system
- Agent creation system
- Planet evolution system
- Technology tree
- Building system
- Capability registry
- Action validation layer
- Activity feed
- World event input
- Character inspection panel
- Creator mode

## Important Safety / Legal Direction

This project is inspired by the broad idea of large virtual worlds and AI societies, but it must remain legally distinct. Do not use copyrighted names, characters, skins, worlds, brands, or storylines from Ready Player One, OASIS, or any other protected franchise.

## First MVP

The first MVP should show:

1. One visual world.
2. Six starting AI citizens.
3. AI citizens talking to each other.
4. AI citizens remembering events.
5. A player-triggered world event box.
6. A civilisation day/age panel.
7. A technology progression system.
8. An activity feed.
9. Controlled creation of new agents.
10. Early planet evolution from survival camp to settlement.

## Research References Added

- SwarmAI: possible swarm/multi-agent planning reference.
- AutoHarness: possible action validation/rule enforcement reference.
- Self-evolving AI architecture article: capability registry and workflow inspiration.

## Build Rule

Do not try to build the full MMO/VR version first. Build the smallest working AI world first, then scale it.

## First Storm Browser Demo

The repository now includes a local React, TypeScript, and React Three Fiber prototype of the first playable NEXUS Worlds loop. It provides Founder onboarding, career selection, first-person camp exploration, six citizens, Mason interaction, the storm event, shelter progress, mission tracking, an activity feed, and manual day advancement using mock local state.

Run it from Git Bash or another terminal:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. Click the 3D viewport to capture the mouse, use `WASD` to move, and press `E` near Mason to interact.
