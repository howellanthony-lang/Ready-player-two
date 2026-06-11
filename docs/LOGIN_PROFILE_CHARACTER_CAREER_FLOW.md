# Login, Profile, Character Creation, Career and Loading Flow

This document defines the first player onboarding flow for NEXUS Worlds.

The game should not drop players straight into the world without identity.

The player should first create or load their Founder profile, build their character identity, choose a starting career/path, then enter Origin Planet through a cinematic loading screen.

## Required Flow

```text
Launch Game
↓
Login / Create Account
↓
Founder Profile
↓
Character Creator
↓
Career / Origin Path Selection
↓
Loading Screen
↓
Spawn on Origin Planet
```

## 1. Login System

The login system should allow players to:

- create account
- log in
- continue saved world
- create new world later
- load Founder profile

For MVP, this can be mocked locally or handled through the current backend direction later.

Do not build complicated auth before the first playable loop works.

MVP auth options:

- guest mode first
- mock login screen
- later real auth with Convex/Auth provider

## 2. Founder Profile

The player is not just a normal avatar.

The player is the Founder/Creator.

Profile should include:

- Founder name
- display name
- profile icon/avatar
- chosen career/path
- current world
- reputation
- unlocked portals later
- civilisation influence score later
- achievements later

Example:

```text
Founder Name: Howell
Origin Path: Architect
Current World: Origin Planet
Reputation: Unknown Founder
```

## 3. Character Creator

The player should be able to create a visual identity.

MVP version can be simple:

- body type preset
- outfit preset
- colour accent
- helmet/visor option
- profile portrait placeholder

Later Unreal version can include:

- face customisation
- hair
- clothing
- armour/exosuit
- cybernetic styles
- Founder symbols
- animations/emotes

## 4. Career / Origin Path System

The player chooses a starting path that affects early abilities and how they help the colony.

Starting career options:

### Architect
Focus: building and shelter.

Starter bonus:

- shelter projects progress faster
- Mason trusts you slightly more

### Engineer
Focus: tools, machines and technology.

Starter bonus:

- research starts faster
- Theo responds better to your suggestions

### Medic
Focus: health, safety and survival.

Starter bonus:

- colony health starts higher
- Ava trusts you slightly more

### Farmer
Focus: food, farming and storage.

Starter bonus:

- food shortage is easier to manage
- Elsie trusts you slightly more

### Scout
Focus: exploration and resources.

Starter bonus:

- reveal land/resource events are stronger
- Nova trusts you slightly more

### Guardian
Focus: safety and defence.

Starter bonus:

- safety starts higher
- Rex trusts you slightly more

## 5. First Career Rule

Careers should influence the game but not lock the player out.

Example:

```text
Architect helps shelter faster, but can still research, farm and explore.
```

## 6. Loading Screen

The loading screen should feel cinematic, not plain.

Show:

- NEXUS Worlds logo
- Origin Planet image/background
- current tip
- world status
- selected career
- mission briefing
- loading progress

Example loading text:

```text
Entering Origin Planet...
Day 1: No shelter. Food is low. A storm is forming.
Your first task: give the citizens tools and help them survive.
```

## 7. Spawn Sequence

After loading, player spawns on Origin Planet.

First moments:

1. camera fades in
2. campfire visible
3. six citizens visible
4. Mason is highlighted
5. prompt says: Walk to Mason
6. player clicks Mason
7. Mason explains shelter problem
8. player gives tools
9. storm event begins

## 8. First MVP Screens

Create these UI screens:

- LoginScreen
- FounderProfileScreen
- CharacterCreatorScreen
- CareerSelectScreen
- LoadingScreen
- GameScreen

## 9. Data Model Direction

Future player profile fields:

```ts
export type FounderCareer =
  | "architect"
  | "engineer"
  | "medic"
  | "farmer"
  | "scout"
  | "guardian";

export type FounderProfile = {
  id: string;
  displayName: string;
  career: FounderCareer;
  avatarPreset: string;
  accentColor: string;
  currentWorldId: string;
  reputation: number;
  createdAt: number;
  updatedAt: number;
};
```

## 10. Convex Tables Later

Possible tables:

- users
- founderProfiles
- avatars
- careers
- saves
- worlds
- achievements

## 11. First Implementation Priority

Do not build full production login yet.

Build a playable onboarding mock first:

1. Login screen with guest/continue button.
2. Founder profile setup.
3. Simple character preset selector.
4. Career selection.
5. Cinematic loading screen.
6. Enter Game button.
7. Spawn into Origin Planet.

## 12. Acceptance Criteria

The onboarding flow is working when:

- player sees login screen
- player can continue as guest
- player enters Founder name
- player selects simple avatar preset
- player chooses career
- loading screen appears
- game opens on Origin Planet
- selected career is visible in player profile
- career choice affects first demo text or starter stats

## Bottom Line

The game should feel like a real product from the first screen.

Players should not just appear in a blank prototype.

They should create their Founder identity, choose a path, load into Origin Planet, and begin shaping civilisation.
