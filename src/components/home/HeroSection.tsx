import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, EyeIcon, RocketIcon, SparklesIcon, UsersIcon } from "lucide-react";
import StatsCard, { StatCardProps } from "./StatsCard";

const LiveBadge = () => {
  return (
    <Badge
      variant="outline"
      className="px-4 py-4 mb-8 text-sm backdrop-blur-sm bg-white/3 border-white/10"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>

      <span className="text-muted-foreground ml-2">
        Join thousands of creators sharing their work
      </span>
    </Badge>
  );
};

const BackGroundGlow = () => (
  <>
    {/* selective glass blends */}
    <div className="absolute inset-0">
      {/* hero spherical glow */}
      <div className="absolute left-1/2 top-[42%] h-130 w-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      {/* inner white haze */}
      <div className="absolute left-1/2 top-[42%] h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-[90px]" />

      {/* right center ambient */}
      <div className="absolute right-[-10%] top-1/2 h-125 w-50 -translate-y-1/2 rounded-full bg-white/6 blur-3xl" />
      {/* right center ambient */}
      <div className="absolute left-[-10%] top-1/2 h-125 w-50 -translate-y-1/2 rounded-full bg-white/6 blur-3xl" />

      {/* subtle top-left ambient */}
      <div className="absolute left-[10%] top-[10%] h-55 w-55 rounded-full bg-white/3 blur-3xl" />

      {/* soft bottom fade */}
      <div className="absolute -bottom-25 left-1/2 h-62.5 w-175 -translate-x-1/2 rounded-full bg-white/2.5 blur-3xl" />
    </div>
  </>
);

const statsData: StatCardProps[] = [
  {
    icon: RocketIcon,
    value: "2.5K+",
    label: "Projects Shared",
  },
  {
    icon: UsersIcon,
    value: "10K+",
    label: "Current Creators",
    hasBorder: true,
  },
  {
    icon: EyeIcon,
    value: "50K+",
    label: "Monthly Visits",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      <BackGroundGlow />

      <div className="wrapper relative z-10">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <LiveBadge />

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            Showcase Innovation.
            <br /> Discover What&apos;s{" "}
            <span className="text-primary">Launching</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              asChild
              className="px-8 py-6 text-base hover:bg-primary-light cursor-pointer shadow-lg"
            >
              <Link href="/submit">
                <SparklesIcon className="size-5" />
                Share Your Project
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="px-8 py-6 text-base border-white/10 bg-white/3 hover:bg-white/6 cursor-pointer shadow-lg"
            >
              <Link href="/explore">
                Explore Projects
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
