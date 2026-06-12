# NEXUS Worlds Build Instructions

This document explains how to prepare, build and test NEXUS Worlds as it moves into Unreal Engine.

## Current Status

The Unreal project may not exist yet.

Until `NexusWorlds.uproject` exists, GitHub Actions can only validate repository structure and documentation.

## Required Tools

Recommended:

- Unreal Engine 5
- Epic Games Launcher
- Git
- Git LFS
- Visual Studio 2022 with C++ game development workload
- Windows 10/11 for first Unreal development pass

## Clone The Repo

```bash
git clone https://github.com/howellanthony-lang/Ready-player-two.git
cd Ready-player-two
```

## Install Git LFS

```bash
git lfs install
git lfs pull
```

The repository tracks Unreal assets such as `.uasset`, `.umap`, `.fbx`, `.wav`, `.mp4`, textures and other large binary assets through Git LFS.

## Create The Unreal Project

Recommended project name:

```text
NexusWorlds
```

Recommended first map:

```text
L_OriginPlanet_StormDemo
```

Follow:

```text
docs/MASTER_UNREAL_GAME_MODEL.md
docs/UNREAL_VERTICAL_SLICE_BUILD_PLAN.md
```

## First Local Test

Open the project in Unreal Engine and confirm:

- project opens without major errors
- Origin Planet map loads
- first-person movement works
- HUD appears
- Mason can be interacted with
- First Storm Demo flow works

## Packaging Later

Do not focus on packaged builds until the editor version of the First Storm Demo works.

When ready, package for Windows first.

## GitHub Actions

The current workflow validates repo structure.

Full Unreal CI requires a machine or runner with Unreal Engine installed. GitHub-hosted runners do not come with Unreal Engine preinstalled.

Recommended future CI:

- self-hosted Windows runner
- Unreal Engine installed locally
- run UnrealBuildTool or BuildCookRun
- run functional tests
- upload logs/artifacts on failure

## Manual Test Checklist

Before committing major gameplay changes:

- First Storm Demo still opens
- no blank screen
- player can move
- mission tracker works
- interaction prompt appears
- Mason interaction works
- Give Tools works
- storm event works
- shelter progress updates
- activity feed logs events
- Advance Day works
- no copied protected assets added

## Stable Milestones

Create tags for stable versions:

```bash
git tag v0.1-first-storm-prototype
git push origin v0.1-first-storm-prototype
```

Use tags only when the project opens and the demo flow works.
