# Agent Creation System

The Agent Creation System allows the world to create new AI citizens when the simulation needs them.

## Purpose

The goal is to make the world feel alive and capable of growth.

New agents may appear through:
- Migration
- World events
- Apprenticeships
- Player creation
- AI generation
- Family/household growth later

## Rules

Agents should not spawn randomly without reason.

A new agent can be created when:
- A useful role is missing
- A world event requires a new character
- The town reaches a milestone
- An AI citizen requests help
- The player creates one
- A faction expands

## First Version Limits

- Minimum agents: 6
- Daily population target: 50
- Maximum agents: 50
- Creation check: once per in-game day
- The simulation can fill the population up to the daily target during a check
- Every new agent must have a clear reason for existing

## Agent Origins

- starter
- migration
- world_event
- apprentice
- player_created
- ai_generated

## Life Stages

- newcomer
- resident
- apprentice
- worker
- leader
- traveller

## Example

If Ironvale builds a workshop and has no blacksmith, the world can create a blacksmith.

Example:

Branna Cole arrives in Ironvale.

Role: Blacksmith  
Origin: Migration  
Life stage: Newcomer  
Goal: Inspect the workshop and meet Mason  
Backstory: Branna travelled to Ironvale after hearing the town had built a new workshop.

Activity feed:

[New Arrival] Branna Cole has arrived in Ironvale.
