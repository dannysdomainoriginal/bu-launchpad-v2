import type { InnovationItem } from "@/components/dashboard/types";

export const trendingInnovationsData: InnovationItem[] = [
  {
    id: "ai-study-assistant",
    title: "AI Study Assistant",
    description:
      "Personalized revision plans generated from your course outline.",
    authorName: "Chidera N.",
    authorRole: "Computer Science",
    votes: 128,
    tags: ["AI", "EdTech"],
    accent: "primary",
  },
  {
    id: "campus-marketplace",
    title: "Campus Marketplace",
    description: "Buy, sell, and swap between hostels without leaving campus.",
    authorName: "Tobi A.",
    authorRole: "Business Admin",
    votes: 94,
    tags: ["Marketplace", "Mobile"],
    accent: "blue",
  },
];

export const lookingForTeammatesData: InnovationItem[] = [
  {
    id: "fintech-team",
    title: "Fintech Startup needs a React Developer",
    description:
      "Escrow-based platform for informal social commerce. Remote, flexible hours.",
    authorName: "Uche K.",
    authorRole: "Team Lead",
    votes: 41,
    tags: ["Fintech", "Remote"],
    accent: "orange",
  },
  {
    id: "medtech-design",
    title: "MedTech Project needs a UI Designer",
    description:
      "Patient triage app for campus clinics. Portfolio + Figma link required.",
    authorName: "Amara O.",
    authorRole: "Nursing Science",
    votes: 27,
    tags: ["MedTech", "Design"],
    accent: "pink",
  },
];
