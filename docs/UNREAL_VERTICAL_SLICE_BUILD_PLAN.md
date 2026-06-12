# NEXUS Worlds — Unreal Engine Master Specification: First Storm Demo Slice

This document is the single source of truth for the first Unreal Engine vertical slice of **NEXUS Worlds**.

It merges the master game direction, the Unreal vertical slice plan, and the corrected First Storm Demo specification into one practical build document.

---

## 1. Overview

**NEXUS Worlds** is a first-person, single-player, living-civilisation game built in Unreal Engine.

The player is **The Founder**: a custom-created character who enters the Nexus, lands on Origin Planet, and influences AI citizens through missions, resources, guidance, relationships and world events.

The first vertical slice is:

```text
NEXUS Worlds: First Storm Demo
```

This slice shows a small survival camp on **Origin Planet** under a storm threat. It introduces the core gameplay loop, first-person interaction, Founder identity, mission tracking, HUD, citizen behaviour, shelter progression and world-state changes.

---

## 2. Project Scope

Build only the **First Storm Demo** vertical slice.

Use **Unreal Engine 5**. Do not lock the project to a specific Unreal version unless that version is confirmed as installed and stable on the development machine.

### In Scope

- first-person Founder gameplay
- Founder creation flow
- career selection
- cinematic loading screen
- Origin Planet survival camp map
- six AI citizen actors
- Mason interaction
- Give Tools action
- storm warning event
- scripted citizen storm reactions
- shelter construction progress
- activity feed/story log
- mission tracker
- simple tech tree display
- Advance Day mock simulation
- daily summary screen

### Out of Scope For This Slice

Do not build yet:

- multiplayer
- vehicles
- flying cars
- space travel
- large cities
- full open-world planet scale
- shops/economy
- police/crime systems
- hundreds of NPCs
- full production authentication
- external AI calls
- backend/cloud sync
- copied GTA or Star Citizen assets/IP

---

## 3. Legal/IP Rule

Use GTA and Star Citizen only as broad inspiration for format.

- GTA-style inspiration: open-world freedom, readable HUD, mission flow, player agency.
- Star Citizen-style inspiration: sci-fi scale, future travel fantasy, world hubs, career fantasy.

Do **not** copy:

- names
- maps
- missions
- vehicles
- ships
- UI exactly
- brands
- characters
- radio/music
- factions
- storylines
- protected assets

NEXUS Worlds must remain original.

---

## 4. Core Gameplay Loop

The first demo proves this loop:

```text
Create Founder
↓
Choose career
↓
Load into Origin Planet
↓
Walk in first-person
↓
Meet Mason
↓
Give tools
↓
Trigger storm warning
↓
Citizens react
↓
Shelter progresses
↓
Advance Day
↓
Daily summary appears
↓
World changes visibly
```

The goal is not to build a massive game immediately.

The goal is to make one small world feel alive.

---

## 5. First Project Name

Recommended Unreal project name:

```text
NexusWorlds
```

First map name:

```text
L_OriginPlanet_StormDemo
```

---

## 6. Recommended Unreal Folder Structure

Use a clean project structure that is easy to expand.

```text
Content/
  NexusWorlds/
    Art/
      Materials/
      Meshes/
      VFX/
      UI/
    Audio/
    Blueprints/
      Characters/
      Citizens/
      Interactions/
      Missions/
      WorldEvents/
      Buildings/
      UI/
      Systems/
    Data/
      Careers/
      Citizens/
      Missions/
      Tech/
    Maps/
      L_OriginPlanet_StormDemo
    Widgets/
      HUD/
      Menus/
      Loading/
    Developer/
```

Simpler early version is acceptable:

```text
Content/
  Blueprints/
  DataAssets/
  Maps/
  Materials/
  Sounds/
  Widgets/
```

But the preferred long-term folder structure is the `Content/NexusWorlds/` structure above.

---

## 7. First Map: Origin Planet

Map name:

```text
L_OriginPlanet_StormDemo
```

Environment:

- small rugged alien survival camp
- rocky terrain
- campfire centre
- basic tent or temporary shelter
- unfinished shelter frame
- sci-fi crates/tools
- resource piles
- watchtower or beacon prop
- six citizen positions
- clear player spawn point
- visible storm clouds
- lightning VFX placeholder
- bounded playable camp area

Movement should be constrained to the camp for the first slice. Do not build a full open world yet.

---

## 8. Core Features To Implement

| System | Description |
|---|---|
| First-person Founder POV | Camera, WASD movement, mouse look, interaction trace, movement constrained within camp boundaries |
| Founder Creation | Name input, avatar preset and simple character identity setup |
| Career Selection | Choose one of six careers; affects starter flavour and simple stats/trust |
| Origin Planet Map | Small alien rocky survival camp with shelter frame, campfire, tent/crates and six citizens |
| Citizen AI | Citizens have roles, moods, energy/trust, current goals and scripted storm reactions |
| Mission Manager | Tracks mission state and progresses the First Storm Demo chain |
| Interaction System | Proximity/trace detection, “Press E to interact” prompts and explicit task completion |
| Storm Event System | Darker sky, lightning flashes, warning HUD and citizen behaviour changes |
| Shelter Progress System | Shelter progress with visible construction stages |
| HUD Widgets/UI | Mission tracker, Founder panel, activity feed, interaction prompt, tech tree and daily summary |
| Loading Screen | Cinematic transition into Origin Planet |
| Simple Tech Tree | Shows early unlocked/locked technologies |

---

## 9. Founder Creation

The player creates their Founder before entering Origin Planet.

MVP requirements:

- Continue as Guest
- Founder name input
- avatar preset selection
- outfit/body preset selection if simple
- colour accent selection if simple
- career selection
- loading screen into Origin Planet

Founder profile fields:

- Founder name
- avatar preset
- colour accent
- chosen career
- current world
- day count

---

## 10. Careers

The player chooses one of six Founder careers.

Careers shape the opening story and starter bonuses. They do not permanently lock the player out of content.

| Career | Focus | Starter Effect |
|---|---|---|
| Architect | Building and shelter | Shelter starts slightly stronger; Mason trust bonus |
| Engineer | Tools and technology | Better tool/research flavour; Theo trust bonus |
| Medic | Health and safety | Health/safety flavour; Ava trust bonus |
| Farmer | Food and storage | Food/storage flavour; Elsie trust bonus |
| Scout | Exploration and discovery | Resource/scouting flavour; Nova trust bonus |
| Guardian | Defence and safety | Camp safety flavour; Rex trust bonus |

---

## 11. First AI Citizens

Start with exactly six citizens.

### Mason

- Role: Builder
- Focus: shelter, construction, infrastructure
- Personality: focused
- Storm reaction: reinforces shelter

### Ava

- Role: Medic
- Focus: health, safety, treatment
- Personality: calm
- Storm reaction: checks medical supplies

### Theo

- Role: Inventor
- Focus: tools, research, technology
- Personality: curious
- Storm reaction: researches better tools

### Elsie

- Role: Farmer
- Focus: food, farming, storage
- Personality: practical
- Storm reaction: protects food stores

### Rex

- Role: Guard
- Focus: safety, patrols, defence
- Personality: alert
- Storm reaction: patrols camp

### Nova

- Role: Explorer
- Focus: scouting, discovery, resources
- Personality: adventurous
- Storm reaction: scouts safer ground

Each citizen should expose:

- name
- role
- mood
- energy
- trust in Founder
- current goal
- current action
- recent memory
- interact text

---

## 12. Key Blueprints / Classes

### BP_FounderCharacter

First-person player character.

Responsibilities:

- movement
- camera/mouse look
- interact trace
- use/interact input
- movement boundary checks
- reference to Founder profile

### BP_Citizen_Base

Base AI citizen actor.

Properties:

- citizenName
- role
- mood
- energy
- currentGoal
- currentAction
- recentMemory
- trustInFounder
- interactText

Child/preset Blueprints:

- BP_Citizen_Mason
- BP_Citizen_Ava
- BP_Citizen_Theo
- BP_Citizen_Elsie
- BP_Citizen_Rex
- BP_Citizen_Nova

### BP_InteractableBase

Base interactable object.

Examples:

- citizen interaction
- tool crate
- shelter frame
- campfire

### BP_MissionManager

Tracks mission state, current objective and completion logic.

### BP_ActivityFeedManager

Stores and broadcasts recent event/story feed entries.

### BP_StormManager

Triggers storm warning and handles environment/citizen state changes.

### BP_ShelterManager

Tracks shelter build progress and visual construction stages.

### BP_AdvanceDayManager

Runs the simple deterministic day-advance simulation.

---

## 13. Data Assets

### DA_FounderCareer

Fields:

- careerId
- displayName
- description
- starterBonusText
- preferredCitizen
- openingFlavourText

### DA_CitizenPreset

Fields:

- name
- role
- defaultMood
- defaultEnergy
- defaultGoal
- defaultAction
- defaultMemory
- startingTrust
- stormReactionGoal
- stormReactionAction

### DA_MissionDefinition

Fields:

- missionId
- title
- objective
- completionCondition
- rewardText

### DA_TechNode

Fields:

- techId
- displayName
- status
- requirementText

---

## 14. Mission Chain

First mission chain:

1. Enter The Nexus
2. Meet Mason
3. Give Tools
4. The Storm Warning
5. Secure The Camp
6. Advance Day
7. Build First Shelter
8. First Council

### Mission Rules

Each mission should have:

- clear objective
- visible HUD tracker
- reason it matters
- explicit player action where possible
- citizen reaction
- activity feed update
- visible world change where possible

### Required Mission Behaviours

- **Enter The Nexus** completes after onboarding/loading.
- **Meet Mason** completes when player interacts with Mason.
- **Give Tools** completes when player gives Mason tools.
- **The Storm Warning** completes when storm event activates.
- **Secure The Camp** completes when all citizens receive storm reaction goals.
- **Advance Day** completes after the Advance Day button/action.
- **Build First Shelter** progresses through shelter stages.
- **First Council** unlocks only after shelter milestone/completion.

---

## 15. Shelter Progress System

First project:

```text
Build First Shelter
```

Progress stages:

- 0%: no shelter / marked construction area
- 25%: frame visible
- 50%: partial walls
- 75%: roof cover
- 100%: completed functional shelter

Progress should update after:

- Give Tools action
- Advance Day
- mission milestones

---

## 16. Storm Event System

When the storm activates:

- sky darkens
- blue/dark vignette appears if using post-process
- lightning flashes
- storm warning appears in HUD
- campfire glow feels stronger against darker sky
- activity feed adds storm warning entry
- citizen goals update to storm reactions
- mission tracker progresses

Storm event should be deterministic for the first slice.

No complex weather simulation yet.

---

## 17. Advance Day System

Advance Day should run a simple deterministic update.

On Advance Day:

- day count increases
- shelter progress increases
- citizen actions update
- resources can adjust slightly if implemented
- daily summary modal appears
- activity feed logs summary entries
- next mission unlocks if conditions are met

Example summary:

```text
Day 2 Summary
Mason gathered wood.
Ava checked supplies.
Rex patrolled camp.
Theo improved basic tools.
Shelter progress: 35%.
Storm risk: High.
```

---

## 18. Tech Tree MVP

Show a simple tech tree strip/panel.

Early nodes:

- Fire
- Tools
- Construction
- Farming
- Storage
- Electricity locked
- Vehicles locked
- Flying Cars locked
- Spaceport locked

Tech tree is display-first in the first slice.

Do not build full research simulation yet.

---

## 19. UI Widgets

### WBP_LoginScreen

- Continue as Guest
- Start New Founder

### WBP_FounderProfile

- Founder name input
- confirm button

### WBP_CharacterCreator

MVP:

- avatar preset selector
- outfit/body preset selector
- colour accent selector

### WBP_CareerSelect

- career cards
- career description
- starter bonus text
- continue button

### WBP_LoadingScreen

Shows:

- NEXUS Worlds logo
- Origin Planet visual/background
- selected Founder career
- loading text

Example:

```text
Entering Origin Planet...
Day 1: No shelter. Food is low. A storm is forming.
```

### WBP_GameHUD

Contains:

- Founder info panel
- world status panel
- current mission tracker
- interaction prompt
- selected citizen panel
- activity feed
- shelter progress
- simple tech tree
- storm warning
- Advance Day button/action

### WBP_MissionTracker

- current mission title
- current objective
- status: in progress / complete

### WBP_ActivityFeed

- 3–6 latest event entries
- readable, short, story-like updates

### WBP_InteractionPrompt

Example:

```text
Press E to interact with Mason
```

### WBP_DailySummary

Shows results of Advance Day.

### WBP_TechTree

Shows unlocked and locked tech nodes.

---

## 20. HUD Style

Use the approved NEXUS Worlds HUD style:

- dark navy panels
- neon cyan borders and highlights
- orange warnings
- green success/status indicators
- sharp-edged sci-fi rectangles
- minimal rounding
- subtle transparency
- readable text
- subtle glow on active warnings

Do not copy GTA HUD directly.

Create a NEXUS-original first-person sci-fi survival HUD inspired by readability and clarity.

---

## 21. First Controls

Suggested controls:

- WASD: move
- Mouse: look
- E: interact
- Tab: mission/profile menu later
- M: map later
- F: Founder tool action later
- Esc: pause

---

## 22. First Gameplay Flow

1. Player launches game.
2. Login/guest screen appears.
3. Player enters Founder name.
4. Player chooses character/avatar preset.
5. Player chooses career.
6. Cinematic loading screen appears.
7. Player spawns on Origin Planet.
8. HUD shows current mission: Meet Mason.
9. Player walks to Mason.
10. Player presses E to interact.
11. Mason explains the shelter problem.
12. Mission updates to Give Tools.
13. Player gives tools.
14. Shelter project starts.
15. Storm warning triggers.
16. Citizens update goals.
17. Activity feed records events.
18. Player secures camp.
19. Player advances day.
20. Shelter progresses.
21. Daily summary appears.
22. First Council unlocks after shelter milestone.

---

## 23. Development Order

1. Create Unreal project and folder structure.
2. Create first-person Founder controller and camera.
3. Create Origin Planet map with static camp environment.
4. Create core HUD widgets.
5. Create onboarding screens.
6. Create Founder profile and career data.
7. Create citizen base Blueprint and six citizen presets.
8. Place citizens in Origin Planet map.
9. Build interaction system and Mason interaction.
10. Build mission manager and first mission chain.
11. Build Give Tools action.
12. Build shelter progress manager and visual stages.
13. Build storm manager and visual effects placeholders.
14. Update citizen goals on storm activation.
15. Build activity feed manager and UI binding.
16. Build Advance Day manager and daily summary.
17. Add simple tech tree display.
18. Test full mission flow.
19. Polish HUD readability, lighting, VFX and camera feel.
20. Package/test build only when the slice runs cleanly.

---

## 24. Acceptance Criteria

The First Storm Demo is successful when:

- Unreal project opens cleanly.
- Origin Planet map loads.
- Founder creation and career select function correctly.
- Loading screen transitions into the playable map.
- First-person camera and WASD movement work within camp bounds.
- Founder name and career appear in HUD.
- Six citizens exist in the camp.
- Citizens have distinct roles/states.
- Mason interaction requires explicit E input.
- Mission tracker reflects current objectives clearly.
- Give Tools action starts shelter project.
- Storm event changes lighting/sky/VFX and citizen states.
- Shelter phases visibly update on progress.
- Activity feed logs events in real time.
- Advance Day produces a daily summary.
- Tech tree displays locked/unlocked nodes.
- UI renders correctly on desktop.
- No copied GTA or Star Citizen protected content is used.
- No major runtime errors block gameplay.

Mobile layout can be considered later. The first Unreal slice should prioritise desktop/PC playability.

---

## 25. Notes For AI Coding Assistants

- Follow the Blueprint and data asset structure.
- Use Blueprints first for speed.
- Use C++ only where it clearly improves long-term structure.
- Keep logic deterministic and local.
- Do not use external AI calls in the first slice.
- Do not merge external repos into gameplay source without review.
- Use placeholder meshes/materials where needed.
- Prioritise playable flow over visual perfection.
- Keep the slice small.
- Do not expand scope before the First Storm Demo works.

---

## 26. Hard Rule

Every feature must pass this test:

```text
Does this make the First Storm Demo clearer, more playable, more alive, or more emotionally engaging?
```

If the answer is no, delay it.

---

## 27. Bottom Line

This document is the build contract for the first Unreal development slice of NEXUS Worlds.

All subsequent Unreal development should align with this plan until the First Storm Demo is playable, tested and polished.

The game wins by making one small world feel alive first.