# What's Your Claude Code Buddy?

Every [Claude Code](https://claude.ai/code) user has a secret companion — a procedurally generated creature hidden in the source code. Your buddy is determined by your account ID and stays with you forever. This script reveals it.

## How it works

Claude Code uses a **Mulberry32 PRNG** seeded with a **FNV-1a hash** of your `accountUuid` + salt `friend-2026-401`. The seed is deterministic — same account always produces the same buddy. No rerolls.

## Usage

```bash
node buddy.js
```

Requires [Claude Code](https://claude.ai/code) installed and logged in (`~/.claude.json` must exist).

## Rarity system

| Rarity | Chance | Base stats | Hats |
|-----------|--------|------------|------|
| ★ Common | 60% | 5 | None |
| ★★ Uncommon | 25% | 15 | Random |
| ★★★ Rare | 10% | 25 | Random |
| ★★★★ Epic | 4% | 35 | Random |
| ★★★★★ Legendary | 1% | 50 | Random |

On top of rarity, there is an independent **1% shiny** chance. A Shiny Legendary is **0.01%**.

## 18 Species

All rarities share one pool — species is picked uniformly at random:

`duck` · `goose` · `blob` · `cat` · `dragon` · `octopus` · `owl` · `penguin` · `turtle` · `snail` · `ghost` · `axolotl` · `capybara` · `cactus` · `robot` · `rabbit` · `mushroom` · `chonk`

## Appearance

| Feature | Variants |
|---|---|
| **Eyes** (6) | `·` `✦` `×` `◉` `@` `°` |
| **Hats** (8) | `none` · `crown` · `tophat` · `propeller` · `halo` · `wizard` · `beanie` · `tinyduck` |

Common buddies always get `hat: none`. Uncommon+ get a random hat.

## Stats

Every buddy has 5 stats (0–100). Each gets a **primary stat** (boosted +50) and a **secondary stat** (slightly nerfed). The rest are randomized around the rarity base value.

| Stat | Description |
|------|------------|
| **DEBUGGING** | How good at finding bugs |
| **PATIENCE** | Tolerance for long tasks |
| **CHAOS** | Tendency to suggest wild ideas |
| **WISDOM** | Quality of advice |
| **SNARK** | Level of sarcasm |

## Example output

```
╔══════════════════════════════════════╗
║       YOUR CLAUDE CODE BUDDY        ║
╠══════════════════════════════════════╣
║  Species:  GHOST                    ║
║  Rarity:   COMMON ★                ║
║  Eyes:     @                        ║
║  Hat:      none                     ║
║  Shiny:    No                       ║
╠══════════════════════════════════════╣
║  DEBUGGING █████████████░░░░░░░  56 ║
║  PATIENCE  ████████░░░░░░░░░░░░  39 ║
║  CHAOS     ██████░░░░░░░░░░░░░░  27 ║
║  WISDOM    █░░░░░░░░░░░░░░░░░░░   4 ║
║  SNARK     ██░░░░░░░░░░░░░░░░░░   9 ║
╚══════════════════════════════════════╝
```

## Probability cheat sheet

| What | Chance |
|------|--------|
| Any legendary | 1% |
| Any epic | 4% |
| Specific species + legendary | 0.056% |
| Shiny | 1% |
| Shiny legendary | 0.01% |
| Shiny legendary + specific species | 0.00056% |

## Credits

Buddy system discovered in Claude Code CLI source (`cli.js`). Species names are obfuscated via `String.fromCharCode()` — Anthropic clearly didn't want them easily searchable.
