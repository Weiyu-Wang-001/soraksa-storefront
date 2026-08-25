export type Product = {
  slug: string;
  order: number;
  title: string;
  companion: string;
  image: string;
  accent: string;
  atmosphere: string;
  shortStory: string;
};

export const products: Product[] = [
  {
    slug: "the-cinnamon-sniffer",
    order: 1,
    title: "The Cinnamon Sniffer",
    companion: "Peekaboo · The Little Dachshund",
    image: "/images/products/series/the-cinnamon-sniffer.png",
    accent: "#d99a2b",
    atmosphere: "Curious · Warm · Playful",
    shortStory: "For the curious soul who always follows the most inviting trail.",
  },
  {
    slug: "the-mist-city-adventurer",
    order: 2,
    title: "The Mist-City Adventurer",
    companion: "Mudpie · The Westie",
    image: "/images/products/series/the-mist-city-adventurer.png",
    accent: "#8a6049",
    atmosphere: "Grounded · Brave · Wandering",
    shortStory: "For quiet explorers who find their way by instinct, even through the mist.",
  },
  {
    slug: "the-moonlight-scribe",
    order: 3,
    title: "The Moonlight Scribe",
    companion: "Pepper · The Ragdoll Cat",
    image: "/images/products/series/the-moonlight-scribe.png",
    accent: "#c86569",
    atmosphere: "Dreaming · Tender · Reflective",
    shortStory: "For the night thinker who turns small feelings into entire worlds.",
  },
  {
    slug: "yuzu-breeze",
    order: 4,
    title: "Yuzu Breeze",
    companion: "Cat Mountain",
    image: "/images/products/series/yuzu-breeze.png",
    accent: "#c4a900",
    atmosphere: "Bright · Open · Restorative",
    shortStory: "For the free spirit who opens every window when the mountain wind arrives.",
  },
  {
    slug: "helios",
    order: 5,
    title: "Helios",
    companion: "The Golden Bird",
    image: "/images/products/series/helios.png",
    accent: "#a74634",
    atmosphere: "Radiant · Resolute · Generous",
    shortStory: "For the steady light that keeps glowing long after the sun slips away.",
  },
  {
    slug: "halcyon",
    order: 6,
    title: "Halcyon",
    companion: "The Silver Bird",
    image: "/images/products/series/halcyon.png",
    accent: "#8c9487",
    atmosphere: "Clear · Still · Otherworldly",
    shortStory: "For the quiet observer who notices the shimmer between one moment and the next.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
