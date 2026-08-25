import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("public/images/quiz/sources");
const outputRoot = path.resolve("public/images/quiz/scenes");

const scenes = {
  "opening": ["sunlit-forest-pexels.jpg", 0.82, 8, 0.9],
  "doors": ["three-doors-original.png", 1, 0, 1],
  "water-arrival": ["water-becoming-ai.png", 1, 0, 1.0],
  "water-becoming": ["water-becoming-ai.png", 0.94, -5, 0.98],
  "water-bird": ["water-bird-ai.png", 1, 0, 1.03],
  "water-change": ["water-becoming-ai.png", 1.08, 8, 1.08],
  "water-still": ["night-river-pexels.jpg", 0.82, -18, 0.88],
  "water-touch": ["water-bird-ai.png", 1.12, 5, 1.1],
  "water-watch": ["water-bird-ai.png", 0.84, -8, 0.9],
  "forest-arrival": ["sunlit-forest-pexels.jpg", 0.6, 35, 0.7],
  "forest-river": ["forest-river-ai.png", 0.86, 0, 0.88],
  "forest-climb": ["forest-climb-ai.png", 0.82, 0, 0.9],
  "forest-listen": ["forest-river-ai.png", 0.72, -12, 0.76],
  "forest-lake": ["night-river-pexels.jpg", 0.66, -9, 0.76],
  "forest-rest": ["forest-climb-ai.png", 0.72, 16, 0.8],
  "forest-clue": ["forest-climb-ai.png", 0.94, 25, 1.02],
  "grass-arrival": ["mist-grassland-pexels.jpg", 0.88, 0, 0.9],
  "grass-memories": ["grass-memories-ai.png", 0.9, 0, 0.96],
  "grass-run": ["grass-run-ai.png", 0.9, 0, 0.98],
  "grass-carry": ["grass-memories-ai.png", 0.7, -10, 0.82],
  "grass-search": ["grass-memories-ai.png", 0.8, 12, 0.9],
  "grass-mist": ["grass-run-ai.png", 0.64, -12, 0.74],
  "grass-light": ["grass-run-ai.png", 1.06, 8, 1.08],
};

await fs.mkdir(outputRoot, { recursive: true });

for (const [scene, [source, brightness, hue, saturation]] of Object.entries(scenes)) {
  await sharp(path.join(sourceRoot, source))
    .resize(4096, 2304, { fit: "cover", position: "centre" })
    .modulate({ brightness, hue, saturation })
    .webp({ quality: 86, effort: 5, smartSubsample: true })
    .toFile(path.join(outputRoot, `${scene}.webp`));
}

console.log(`Built ${Object.keys(scenes).length} 4K quiz backgrounds.`);
