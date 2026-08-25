export type ScentResultId =
  | "helios"
  | "yuzu-breeze"
  | "the-moonlight-scribe"
  | "the-cinnamon-sniffer"
  | "the-mist-city-adventurer"
  | "halcyon";

export type QuizChoice = {
  label: string;
  next?: string;
  result?: ScentResultId;
};

export type QuizScene = {
  id: string;
  world: "water" | "forest" | "grass";
  step: 2 | 3 | 4;
  copy: string;
  question: string;
  choices: QuizChoice[];
};

export type ScentResult = {
  id: ScentResultId;
  personality: string;
  supportingLine: string;
  personalityCopy: string;
  productName: string;
  image: string;
  scentDescription: string;
  notes: string;
  mood: string;
  secondary: string;
};

export const doorChoices = [
  {
    label: "The weathered blue door",
    description: "Faded blue-green, with clear light slipping around its edges.",
    tone: "water" as const,
    next: "water-arrival",
  },
  {
    label: "The dark wooden door",
    description: "Tall, nearly black, with botanical markings and a pulse of amber.",
    tone: "forest" as const,
    next: "forest-arrival",
  },
  {
    label: "The white door",
    description: "Perfectly still, except for edges trembling in an unseen wind.",
    tone: "grass" as const,
    next: "grass-arrival",
  },
];

export const quizScenes: Record<string, QuizScene> = {
  "water-arrival": {
    id: "water-arrival", world: "water", step: 2,
    copy: "You step into an endless stretch of shallow water. It barely reaches your ankles. The sky is impossibly blue, the surface smooth as glass. Far away, something glimmers.",
    question: "What do you do?",
    choices: [
      { label: "Lie back and let the stillness hold you.", next: "water-becoming" },
      { label: "Walk toward the distant light.", next: "water-bird" },
    ],
  },
  "water-becoming": {
    id: "water-becoming", world: "water", step: 3,
    copy: "The water catches you. Grass grows from your hair. Stone gathers along your spine. Your breath becomes wind. You are no longer beside the landscape. You are becoming it.",
    question: "What should happen to this world?",
    choices: [
      { label: "Let it change. Let everything begin again.", next: "water-change" },
      { label: "Keep it exactly as it is. Let nothing be lost.", next: "water-still" },
    ],
  },
  "water-bird": {
    id: "water-bird", world: "water", step: 3,
    copy: "The light grows brighter: a golden bird made entirely of light, hovering just above the water. It sees you. And waits.",
    question: "What do you do?",
    choices: [
      { label: "Reach out and touch it.", next: "water-touch" },
      { label: "Stay where you are and watch.", next: "water-watch" },
    ],
  },
  "water-change": {
    id: "water-change", world: "water", step: 4,
    copy: "Seasons move across you. Flowers bloom and disappear. Rivers shift. Trees fall. New forests rise. Every morning, the world is slightly different.",
    question: "How does that make you feel?",
    choices: [
      { label: "I want to move with it.", result: "helios" },
      { label: "I want to remember what passes.", result: "yuzu-breeze" },
    ],
  },
  "water-still": {
    id: "water-still", world: "water", step: 4,
    copy: "Time stops. Leaves hang motionless and rivers become glass. Everything is safe from change. Beneath the silence, dreams grow restless, longing to move again.",
    question: "What do you give them?",
    choices: [
      { label: "Dreams wild enough to move the world again.", result: "yuzu-breeze" },
      { label: "A morning. Let everything wake.", result: "helios" },
    ],
  },
  "water-touch": {
    id: "water-touch", world: "water", step: 4,
    copy: "At your touch, the bird becomes a river of light. Suddenly, you can fly. But when you look down, your shadow remains standing on the water below.",
    question: "Where do you belong?",
    choices: [
      { label: "Follow the light beyond the horizon.", result: "helios" },
      { label: "Return to the shadow waiting for me.", result: "yuzu-breeze" },
    ],
  },
  "water-watch": {
    id: "water-watch", world: "water", step: 4,
    copy: "The bird flies toward the horizon. Just before disappearing, it looks back once — almost as if asking whether you are coming.",
    question: "Do you follow?",
    choices: [
      { label: "Run after it.", result: "helios" },
      { label: "Let it go. Stay with the wind.", result: "yuzu-breeze" },
    ],
  },
  "forest-arrival": {
    id: "forest-arrival", world: "forest", step: 2,
    copy: "You step into a rainforest beneath an endless night. Silver moonlight hangs between enormous leaves. Tiny lights flicker in the distance. Behind you, the doorway is gone.",
    question: "How do you look for a way out?",
    choices: [
      { label: "Follow the river. Water must lead somewhere.", next: "forest-river" },
      { label: "Climb toward higher ground. I want to see farther.", next: "forest-climb" },
    ],
  },
  "forest-river": {
    id: "forest-river", world: "forest", step: 3,
    copy: "The river begins to whisper. Laughter. Anger. A lullaby. A goodbye. Fragments of lives seem to be traveling inside the water.",
    question: "What do you do?",
    choices: [
      { label: "Slow down and listen.", next: "forest-listen" },
      { label: "Keep moving. I still need to find the way out.", next: "forest-lake" },
    ],
  },
  "forest-climb": {
    id: "forest-climb", world: "forest", step: 3,
    copy: "You climb deeper into the forest. The trees grow thicker. The moon disappears. Eventually you realize you have no idea where you came from. Then your stomach growls.",
    question: "What do you do?",
    choices: [
      { label: "Sit down and rest.", next: "forest-rest" },
      { label: "Keep moving and search for a clue.", next: "forest-clue" },
    ],
  },
  "forest-listen": {
    id: "forest-listen", world: "forest", step: 4,
    copy: "The longer you listen, the less the river sounds like noise. Each voice becomes part of a story. Moonlight settles over the water, and time feels unimportant.",
    question: "What feels right?",
    choices: [
      { label: "Stay here a little longer.", result: "the-moonlight-scribe" },
      { label: "Carry the stories with me and return.", result: "the-cinnamon-sniffer" },
    ],
  },
  "forest-lake": {
    id: "forest-lake", world: "forest", step: 4,
    copy: "The river opens into a quiet lake. On a stone sits a white cat with blue eyes. She lifts water in one paw, and the tangled voices become a single beautiful story.",
    question: "What do you ask of her?",
    choices: [
      { label: "Nothing. I just want to listen.", result: "the-moonlight-scribe" },
      { label: "Ask her how to leave the rainforest.", result: "the-cinnamon-sniffer" },
    ],
  },
  "forest-rest": {
    id: "forest-rest", world: "forest", step: 4,
    copy: "You fall asleep against a tree. Somewhere nearby, something warm is baking: cinnamon, orange peel, bread. Farther away, a white cat waits beneath the moon.",
    question: "Which feeling do you follow?",
    choices: [
      { label: "The moonlight. Stay inside the dream.", result: "the-moonlight-scribe" },
      { label: "The warmth. Wake and find its source.", result: "the-cinnamon-sniffer" },
    ],
  },
  "forest-clue": {
    id: "forest-clue", world: "forest", step: 4,
    copy: "Two paths reveal themselves. Ahead: a faint, melodic voice. Behind: something warm and spiced — orange peel, cinnamon, and something freshly baked.",
    question: "Which one do you follow?",
    choices: [
      { label: "The distant voice.", result: "the-moonlight-scribe" },
      { label: "The warm scent.", result: "the-cinnamon-sniffer" },
    ],
  },
  "grass-arrival": {
    id: "grass-arrival", world: "grass", step: 2,
    copy: "The grassland has neither day nor night. The sun and moon share the sky. Wind moves through the hills. You feel that you have lost something. Far away, a small white shape is running.",
    question: "What do you follow?",
    choices: [
      { label: "Search for the thing I lost.", next: "grass-memories" },
      { label: "Forget it. Run after the white shape.", next: "grass-run" },
    ],
  },
  "grass-memories": {
    id: "grass-memories", world: "grass", step: 3,
    copy: "Tiny stars are scattered through the grass. Each becomes a memory: summer insects, an open window, laughter in another room. A silver bird carries them across the sky.",
    question: "What do you do with them?",
    choices: [
      { label: "Pick them up.", next: "grass-carry" },
      { label: "Leave them and keep searching.", next: "grass-search" },
    ],
  },
  "grass-run": {
    id: "grass-run", world: "grass", step: 3,
    copy: "You run. At last you catch up: a little white Westie, tail raised like a flag. Without slowing down, it runs straight into a wall of mist.",
    question: "How do you enter?",
    choices: [
      { label: "Run straight in after it.", next: "grass-mist" },
      { label: "Stop first. Find some light.", next: "grass-light" },
    ],
  },
  "grass-carry": {
    id: "grass-carry", world: "grass", step: 4,
    copy: "Your pockets grow heavier with memories that may not belong to you. Some are beautiful. Some hurt. None of them want to stay forever.",
    question: "What do you do?",
    choices: [
      { label: "Give them somewhere quiet to rest.", result: "halcyon" },
      { label: "Carry them with me and keep moving.", result: "the-mist-city-adventurer" },
    ],
  },
  "grass-search": {
    id: "grass-search", world: "grass", step: 4,
    copy: "Whatever you lost is not hiding inside someone else's memories. The silver bird lands nearby. The white shape is still running in the distance.",
    question: "What now?",
    choices: [
      { label: "Ask the silver bird what it knows.", result: "halcyon" },
      { label: "Stop looking backward. Follow the white shape.", result: "the-mist-city-adventurer" },
    ],
  },
  "grass-mist": {
    id: "grass-mist", world: "grass", step: 4,
    copy: "The mist takes everything. No grassland. No sun. No moon. Only your footsteps and the faint white shape moving somewhere ahead.",
    question: "What do you trust?",
    choices: [
      { label: "Momentum. Run faster.", result: "the-mist-city-adventurer" },
      { label: "Myself. Slow down and listen.", result: "halcyon" },
    ],
  },
  "grass-light": {
    id: "grass-light", world: "grass", step: 4,
    copy: "At the edge of the fog, you notice warmth beneath your ribs. A tiny star glows inside your chest. You lift it into your hand.",
    question: "What do you do with the light?",
    choices: [
      { label: "Carry it forward and illuminate the unknown.", result: "the-mist-city-adventurer" },
      { label: "Leave it behind to light the road home.", result: "halcyon" },
    ],
  },
};

export const scentResults: Record<ScentResultId, ScentResult> = {
  helios: {
    id: "helios", personality: "The Light Seeker", supportingLine: "You move toward possibility before certainty arrives.",
    personalityCopy: "You are drawn to movement, purpose, and the glow of what comes next. You do not need the entire path to be visible before taking the first step. For you, light is not a destination. It is a direction.",
    productName: "Helios", image: "/images/products/series/helios.png",
    scentDescription: "A luminous amber-wood fragrance with warmth beneath its brightness. Orange blossom and green herbs open the scent before pine, cinnamon, sandalwood, musk, and glowing amber.",
    notes: "Orange blossom · Pine · Cinnamon · Sandalwood · Amber", mood: "For quiet focus, reflection, and moments when you want to reset your direction.", secondary: "Yuzu Breeze",
  },
  "yuzu-breeze": {
    id: "yuzu-breeze", personality: "The Windborne", supportingLine: "You know that holding lightly can sometimes mean feeling more deeply.",
    personalityCopy: "You move through life with curiosity rather than force. You notice small changes — a shift in weather, a familiar scent, a room becoming lighter. You know when to stay. And when to let the wind carry you somewhere new.",
    productName: "Yuzu Breeze", image: "/images/products/series/yuzu-breeze.png",
    scentDescription: "Bright yuzu and citrus meet cool green leaves, mint, jasmine, and soft vetiver. Fresh without becoming sharp, it feels like wind moving through a sunlit grove.",
    notes: "Yuzu · Citrus · Mint · Jasmine · Vetiver", mood: "For fresh starts, clear mornings, reading, studying, or simply opening a window inside your mind.", secondary: "Helios",
  },
  "the-moonlight-scribe": {
    id: "the-moonlight-scribe", personality: "The Dream Weaver", supportingLine: "You notice the stories hidden inside quiet things.",
    personalityCopy: "Your inner world is rich, observant, and gently imaginative. You are comfortable staying with a feeling long enough to understand it. Where others hear silence, you often hear a story beginning.",
    productName: "The Moonlight Scribe", image: "/images/products/series/the-moonlight-scribe.png",
    scentDescription: "A soft floral-wood fragrance where citrus and lilac drift into iris, pine, cinnamon, guaiac wood, amber, and musk. Gentle, intimate, and slightly dreamlike.",
    notes: "Lilac · Iris · Pine · Guaiac wood · Amber", mood: "For late-night reading, slow afternoons, quiet conversations, and time spent inside your own world.", secondary: "The Cinnamon Sniffer",
  },
  "the-cinnamon-sniffer": {
    id: "the-cinnamon-sniffer", personality: "The Hearth Seeker", supportingLine: "You find meaning in warmth, familiarity, and the small pleasures that make a place feel like home.",
    personalityCopy: "You are sensitive to atmosphere. Warm food, familiar rooms, a soft blanket, someone waiting nearby — these things matter to you. Comfort is not an escape. It is how you return to yourself.",
    productName: "The Cinnamon Sniffer", image: "/images/products/series/the-cinnamon-sniffer.png",
    scentDescription: "Almond and orange peel open into cinnamon, clove, and warm cassia. Spiced, comforting, and softly gourmand — like discovering something warm in the middle of a cold evening.",
    notes: "Almond · Orange peel · Cinnamon · Clove · Cassia", mood: "For cozy evenings, slow weekends, winding down, and making ordinary spaces feel warmer.", secondary: "The Moonlight Scribe",
  },
  "the-mist-city-adventurer": {
    id: "the-mist-city-adventurer", personality: "The Pathfinder", supportingLine: "You would rather discover the road by walking it.",
    personalityCopy: "The unknown does not always feel threatening to you. Sometimes it feels like an invitation. You are energized by movement, new places, and the possibility that the next turn may change everything.",
    productName: "The Mist-City Adventurer", image: "/images/products/series/the-mist-city-adventurer.png",
    scentDescription: "Crisp green leaves and bergamot move into jasmine and hyacinth before settling into resin and warm amber. Green, bright, and quietly energetic.",
    notes: "Green leaves · Bergamot · Hyacinth · Resin · Amber", mood: "For focused work, creative momentum, new projects, and mornings when you want to move forward.", secondary: "Halcyon",
  },
  halcyon: {
    id: "halcyon", personality: "The Quiet Keeper", supportingLine: "You understand that not everything precious needs to be carried forever.",
    personalityCopy: "You are reflective, patient, and deeply aware of what has shaped you. You do not rush every feeling toward an answer. Sometimes you protect what matters by giving it somewhere peaceful to rest.",
    productName: "Halcyon", image: "/images/products/series/halcyon.png",
    scentDescription: "Fresh citrus and green leaves open into lavender, jasmine, and oakmoss before becoming smoky sandalwood, amber, and musk. Cool, meditative, and quietly grounding.",
    notes: "Citrus · Lavender · Oakmoss · Smoked wood · Sandalwood · Amber", mood: "For reading alone, journaling, reflection, and evenings when the world needs to become a little quieter.", secondary: "The Mist-City Adventurer",
  },
};
