# NEXUS Worlds Coding Guidelines

These rules keep the project maintainable as it moves into Unreal Engine.

## Core Rule

Build the First Storm Demo clearly before expanding scope.

Every change should answer yes to this question:

```text
Does this make the First Storm Demo clearer, more playable, more alive, or more emotionally engaging?
```

If not, move it to future backlog.

## Unreal Blueprint Naming

Use clear prefixes:

- `BP_` for Blueprint actors/classes
- `WBP_` for Widget Blueprints
- `DA_` for Data Assets
- `DT_` for Data Tables
- `MI_` for Material Instances
- `M_` for Materials
- `T_` for Textures
- `S_` for Sounds
- `NS_` for Niagara Systems
- `L_` for Levels/Maps

Examples:

```text
BP_FounderCharacter
BP_Citizen_Mason
BP_MissionManager
WBP_GameHUD
DA_FounderCareer_Architect
L_OriginPlanet_StormDemo
```

## Blueprint Rules

- Keep Blueprints small and readable.
- Avoid huge Event Graphs.
- Use functions for repeated logic.
- Use comments for mission-critical logic.
- Use Data Assets for citizen/career/mission data where possible.
- Keep gameplay logic deterministic in the first slice.
- Do not add external AI calls in the first slice.

## C++ Rules

Use C++ only when it makes long-term structure cleaner.

Recommended C++ candidates later:

- mission state enums
- save/profile structs
- reusable interaction interfaces
- deterministic simulation helpers

C++ style:

- Use the `.clang-format` file.
- Keep functions focused.
- Avoid hard-coded magic values when Data Assets are better.
- Prefer readable names over short names.

## Asset Rules

- Use placeholder assets until gameplay works.
- Store assets in the correct folder.
- Use Git LFS for large Unreal assets.
- Do not commit Marketplace or third-party assets unless licence allows it.
- Do not copy protected GTA, Star Citizen or other game assets.

## Documentation Rules

Update docs when systems change.

Important docs:

- `docs/MASTER_UNREAL_GAME_MODEL.md`
- `docs/UNREAL_VERTICAL_SLICE_BUILD_PLAN.md`
- `docs/BUILD_INSTRUCTIONS.md`
- `docs/CODING_GUIDELINES.md`

## Scope Control

Do not build these until the First Storm Demo works:

- multiplayer
- full city
- vehicles
- space travel
- full economy
- police/crime systems
- hundreds of NPCs
- full backend sync
- complex AI autonomy

The project wins by making one small world feel alive first.
