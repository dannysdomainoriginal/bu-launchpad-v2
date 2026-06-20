import { ProductType } from "./schemas/products";

interface Product extends ProductType {
  tags: { name: string }[];
}

export const ourProductsDb: Product[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Figma",
    slug: "figma",
    description:
      "Collaborative design platform for teams to create, prototype, and handoff designs in real-time",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 4829,
    isFeatured: true,
    createdAt: new Date(1716345600000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image: "/images/project4.jpg",
    liveUrl: "https://www.figma.com",
    authorId: "user_seed_1",
    organizationId: null,
    authorName: "Design Team",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Notion",
    slug: "notion",
    description:
      "All-in-one workspace for notes, databases, wikis, and project management with AI integration",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 5124,
    isFeatured: true,
    createdAt: new Date(1716259200000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    liveUrl: "https://www.notion.so",
    authorId: "user_seed_2",
    organizationId: null,
    authorName: "Productivity Suite",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Linear",
    slug: "linear",
    description:
      "Fast, modern issue tracking built for high-performance software teams",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 3956,
    isFeatured: true,
    createdAt: new Date(1716172800000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    liveUrl: "https://linear.app",
    authorId: "user_seed_3",
    organizationId: null,
    authorName: "Dev Tools",
    authorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Slack",
    slug: "slack",
    description:
      "Unified platform for messaging, collaboration, and workflow automation across teams",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 6234,
    isFeatured: true,
    createdAt: new Date(1716086400000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    liveUrl: "https://slack.com",
    authorId: "user_seed_4",
    organizationId: null,
    authorName: "Communication",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "GitHub Copilot",
    slug: "github-copilot",
    description:
      "AI-powered code completion and generation tool that helps developers write code faster",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 5789,
    isFeatured: true,
    createdAt: new Date(1716000000000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    liveUrl: "https://github.com/features/copilot",
    authorId: "user_seed_5",
    organizationId: null,
    authorName: "AI Development",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Vercel",
    slug: "vercel",
    description:
      "Platform for deploying, managing, and scaling modern web applications with edge computing",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 4567,
    isFeatured: true,
    createdAt: new Date(1715913600000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    liveUrl: "https://vercel.com",
    authorId: "user_seed_6",
    organizationId: null,
    authorName: "DevOps Tools",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Stripe",
    slug: "stripe",
    description:
      "Complete payment processing platform for online businesses with flexible APIs",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 5432,
    isFeatured: true,
    createdAt: new Date(1715827200000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    liveUrl: "https://stripe.com",
    authorId: "user_seed_7",
    organizationId: null,
    authorName: "FinTech",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "HubSpot",
    slug: "hubspot",
    description:
      "Customer relationship management platform with marketing, sales, and service tools",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 4321,
    isFeatured: true,
    createdAt: new Date(1715740800000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    liveUrl: "https://www.hubspot.com",
    authorId: "user_seed_8",
    organizationId: null,
    authorName: "Sales & Marketing",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Calendly",
    slug: "calendly",
    description:
      "Smart scheduling platform that simplifies meeting coordination and calendar management",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 3876,
    isFeatured: true,
    createdAt: new Date(1715654400000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    liveUrl: "https://calendly.com",
    authorId: "user_seed_9",
    organizationId: null,
    authorName: "Time Management",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Canva",
    slug: "canva",
    description:
      "Intuitive design tool that enables anyone to create professional graphics and presentations",
    tags: Array.from({ length: 3 }, (_, i) => ({ name: `Tag ${i + 1}` })),
    voteCount: 5645,
    isFeatured: true,
    createdAt: new Date(1715568000000),
    updatedAt: new Date(1716432000000),
    isApproved: true,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
    liveUrl: "https://www.canva.com",
    authorId: "user_seed_10",
    organizationId: null,
    authorName: "Creative Tools",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
];
