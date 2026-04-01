// buddy.js — Reveal your hidden Claude Code Buddy!
// Usage: node buddy.js

const fs = require("fs");
const os = require("os");
const path = require("path");

// --- Read accountUuid from config ---
const configPath = path.join(os.homedir(), ".claude.json");
let userId = "anon";
try {
  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  userId = cfg.oauthAccount?.accountUuid ?? cfg.userID ?? "anon";
} catch {
  console.error("~/.claude.json not found — make sure Claude Code is installed and logged in.");
  process.exit(1);
}

// --- Mulberry32 PRNG ---
function mulberry32(seed) {
  let s = seed >>> 0;
  return function () {
    s |= 0;
    s = (s + 1831565813) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- FNV-1a hash ---
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// --- Data ---
const species = [
  "duck", "goose", "blob", "cat", "dragon", "octopus",
  "owl", "penguin", "turtle", "snail", "ghost", "axolotl",
  "capybara", "cactus", "robot", "rabbit", "mushroom", "chonk",
];
const eyes = ["\u00B7", "\u2726", "\u00D7", "\u25C9", "@", "\u00B0"];
const hats = ["none", "crown", "tophat", "propeller", "halo", "wizard", "beanie", "tinyduck"];
const STATS = ["DEBUGGING", "PATIENCE", "CHAOS", "WISDOM", "SNARK"];
const tiers = ["common", "uncommon", "rare", "epic", "legendary"];
const weights = { common: 60, uncommon: 25, rare: 10, epic: 4, legendary: 1 };
const stars = { common: "\u2605", uncommon: "\u2605\u2605", rare: "\u2605\u2605\u2605", epic: "\u2605\u2605\u2605\u2605", legendary: "\u2605\u2605\u2605\u2605\u2605" };
const base = { common: 5, uncommon: 15, rare: 25, epic: 35, legendary: 50 };

// --- Generation ---
function getRarity(rng) {
  let roll = rng() * 100;
  for (const t of tiers) {
    roll -= weights[t];
    if (roll < 0) return t;
  }
  return "common";
}

function getStats(rng, rarity) {
  const b = base[rarity];
  const pri = pick(rng, STATS);
  let sec = pick(rng, STATS);
  while (sec === pri) sec = pick(rng, STATS);
  const s = {};
  for (const st of STATS) {
    if (st === pri) s[st] = Math.min(100, b + 50 + Math.floor(rng() * 30));
    else if (st === sec) s[st] = Math.max(1, b - 10 + Math.floor(rng() * 15));
    else s[st] = b + Math.floor(rng() * 40);
  }
  return s;
}

// --- Compute ---
const salt = "friend-2026-401";
const rng = mulberry32(fnv1a(userId + salt));
const rarity = getRarity(rng);
const buddy = {
  species: pick(rng, species),
  eye: pick(rng, eyes),
  hat: rarity === "common" ? "none" : pick(rng, hats),
  shiny: rng() < 0.01,
  stats: getStats(rng, rarity),
};

// --- Output ---
console.log(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551       YOUR CLAUDE CODE BUDDY        \u2551
\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563`);
console.log(`\u2551  Species:  ${buddy.species.toUpperCase().padEnd(25)}\u2551`);
console.log(`\u2551  Rarity:   ${(rarity.toUpperCase() + " " + stars[rarity]).padEnd(25)}\u2551`);
console.log(`\u2551  Eyes:     ${buddy.eye.padEnd(25)}\u2551`);
console.log(`\u2551  Hat:      ${buddy.hat.padEnd(25)}\u2551`);
console.log(`\u2551  Shiny:    ${(buddy.shiny ? "\u2728 YES!" : "No").padEnd(25)}\u2551`);
console.log(`\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563`);
for (const [st, val] of Object.entries(buddy.stats)) {
  const bar = "\u2588".repeat(Math.floor(val / 5)) + "\u2591".repeat(20 - Math.floor(val / 5));
  console.log(`\u2551  ${st.padEnd(10)} ${bar} ${String(val).padStart(3)} \u2551`);
}
console.log(`\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`);
console.log(`  Account: ${userId}`);
