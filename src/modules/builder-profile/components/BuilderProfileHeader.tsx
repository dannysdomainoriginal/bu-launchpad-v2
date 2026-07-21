import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { BuilderProfile } from "@/lib/db/schema";
import BuilderProfileSocialLinks from "./BuilderProfileSocialLinks";
import BuilderProfileStats from "./BuilderProfileStats";

type Props = {
  builder: {
    name: string;
    avatar: string;
  };
  profile: BuilderProfile | null;
  stats: {
    innovations: number;
    totalVotes: number;
    memberSince: Date;
  };
};

export default function BuilderProfileHeader({
  builder,
  profile,
  stats,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
      {/* Visual Header / Cover Backdrop */}
      <div className="h-32 w-full bg-linear-to-r from-primary/10 via-primary/20 to-secondary/30 sm:h-40" />

      {/* Main Profile Info Section */}
      <div className="px-4 pb-6 sm:px-8">
        <div className="relative flex flex-col items-center sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          {/* Overlapping Avatar */}
          <div className="-mt-14 sm:-mt-16">
            <Avatar className="size-28 sm:size-32">
              <AvatarImage
                src={builder.avatar}
                alt={builder.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-bold">
                {builder.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Social Links on Desktop (Floats to the right of avatar) */}
          <div className="mt-4 hidden sm:mt-0 sm:flex sm:pb-2">
            <BuilderProfileSocialLinks profile={profile} />
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-4 flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {builder.name}
            </h1>

            {profile?.course && (
              <Badge variant="secondary" className="font-medium">
                {profile.course}
              </Badge>
            )}
          </div>

          {profile?.headline && (
            <p className="mt-1.5 text-base font-medium text-muted-foreground sm:text-lg">
              {profile.headline}
            </p>
          )}

          {profile?.bio && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {profile.bio}
            </p>
          )}

          {/* Social Links on Mobile */}
          <div className="mt-5 flex justify-center sm:hidden">
            <BuilderProfileSocialLinks profile={profile} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 border-t pt-6">
          <BuilderProfileStats {...stats} />
        </div>
      </div>
    </div>
  );
}
