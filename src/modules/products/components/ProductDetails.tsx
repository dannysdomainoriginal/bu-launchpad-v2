"use cache";

import { notFound } from "next/navigation";
import { ArrowUpRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/RelativeTime";
import { getProductBySlug } from "../products.service";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  // const product = await getProductBySlug(slug);

  // sample product
  const product = {
    id: "7f8d5c0b-8d9c-4f59-a4e5-b9f5d6a2d4a1",
    name: "StudyFlow",
    tagline:
      "An AI-powered study planner that helps students stay consistent and avoid last-minute cramming.",
    slug: "studyflow",
    description: `
StudyFlow is a productivity platform built specifically for university students who struggle with managing coursework, assignments, personal projects, and exam preparation.

The idea started after noticing how many students create timetables they never actually follow. Most planning apps focus on creating schedules, but very few help students adapt when real life gets in the way. Missing a study session often causes students to abandon their entire plan and return to last-minute cramming.

StudyFlow tackles this problem by acting as a flexible academic planning system rather than a rigid calendar. Students can add courses, assignments, exams, side projects, and personal goals. The platform then automatically generates study sessions based on deadlines, workload, and available time.

One of the core features is adaptive rescheduling. If a student misses a planned session, StudyFlow intelligently redistributes the remaining workload across future days instead of simply marking the task as overdue. This helps students stay on track without feeling like they have already failed.
  `,
    isFeatured: true,
    isApproved: true,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    liveUrl: "https://studyflow.app",
    voteCount: 127,

    authorId: "user_2wA9kLh3fX8NqY7",
    organizationId: null,

    authorName: "David Adeyemi",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

    createdAt: new Date("2026-06-15T10:24:00Z"),
    updatedAt: new Date("2026-06-20T18:45:00Z"),

    tags: [
      { name: "Education" },
      { name: "Productivity" },
      { name: "AI" },
      { name: "Student Tools" },
    ],
  };

  if (!product) {
    return notFound();
  }

  const tags = product.tags ?? [];

  return (
    <div>
      {/* HEADER */}
      <div className="grid gap-6 border-b pb-6 md:pb-10 md:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(({ name }) => (
              <Badge key={name} variant="secondary">
                {name}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground">{product.tagline}</p>
          </div>

          <p className="text-sm text-muted-foreground">
            Built by {product.authorName} • Uploaded{" "}
            <RelativeTime date={product.createdAt} />
          </p>
        </div>

        <Card className="h-fit p-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>127 students support this project</span>
            </div>

            <Button className="w-full py-5" asChild>
              <a
                href={product.liveUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Project
                <ArrowUpRight />
              </a>
            </Button>

            <Button variant="outline" className="w-full py-5">
              Upvote
            </Button>
          </div>
        </Card>
      </div>

      {/* BODY */}
      <div className="grid gap-10 border-b py-6 md:py-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Card className="overflow-hidden p-0">
            <div className="relative aspect-video">
              <Image
                alt={product.name}
                src={product.image}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          <section>
            <h2 className="text-xl font-semibold">About this project</h2>

            <p className="whitespace-pre-line leading-7 text-muted-foreground">
              {product.description}
            </p>
          </section>
        </div>

        <Card className="h-fit p-6">
          <div className="space-y-4">
            <Image
              alt={product.authorName}
              src={product.authorAvatar}
              width={80}
              height={80}
              className="rounded-full"
            />

            <div>
              <p className="font-medium">{product.authorName}</p>
              <p className="text-sm text-muted-foreground">Builder</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
