import Link from "next/link";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa"
import { Globe } from "lucide-react";

import type { BuilderProfile } from "@/lib/db/schema";

type Props = {
  profile: BuilderProfile | null;
};

export default function BuilderProfileSocialLinks({ profile }: Props) {
  if (!profile) {
    return null;
  }

  const links = [
    {
      href: profile.githubUrl,
      icon: SiGithub,
      label: "GitHub",
    },
    {
      href: profile.linkedinUrl,
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: profile.twitterUrl,
      icon: SiX,
      label: "X (Twitter)",
    },
    {
      href: profile.websiteUrl,
      icon: Globe,
      label: "Website",
    },
  ].filter((link) => !!link.href);

  if (!links.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Icon className="size-5" />
        </Link>
      ))}
    </div>
  );
}
