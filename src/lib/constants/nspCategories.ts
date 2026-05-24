// Exact Needs descriptions from the LIC 625 paper form (verbatim)
export const NSP_CATEGORIES = [
  {
    key: "socialization",
    title: "SOCIALIZATION",
    needsDescription: "Difficulty in adjusting socially and unable to maintain reasonable personal relationships",
  },
  {
    key: "emotional",
    title: "EMOTIONAL",
    needsDescription: "Difficulty in adjusting emotionally",
  },
  {
    key: "mental",
    title: "MENTAL",
    needsDescription: "Difficulty with intellectual functioning including inability to make decisions regarding daily living.",
  },
  {
    key: "physical_health",
    title: "PHYSICAL/HEALTH",
    needsDescription: "Difficulties with physical development and poor health habits regarding body functions.",
  },
  {
    key: "functioning_skills",
    title: "FUNCTIONING SKILLS",
    needsDescription: "Difficulty in developing and/or using independent functioning skills.",
  },
] as const;

export type NspCategoryKey = typeof NSP_CATEGORIES[number]["key"];