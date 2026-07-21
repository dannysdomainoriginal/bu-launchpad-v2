import { Suspense } from "react";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { builderProfiles } from "@/lib/db/schema";
import { getCachedClerkUser } from "@/modules/builder-profile/builder-profile.service";
import {
  BuilderProfilePageWrapper,
  BuilderProfilePageSkeleton,
} from "@/modules/builder-profile/components";

/* -------------------------------------------------------------------------- */
/*                              GENERATE METADATA                             */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { identifier } = await params;

  try {
    const builder = await getCachedClerkUser(identifier);

    return {
      title: `${builder.name} | BU Launchpad`,
      description: `View ${builder.name}'s builder profile and innovations on BU Launchpad.`,
      openGraph: {
        title: `${builder.name} | BU Launchpad`,
        description: `View ${builder.name}'s builder profile and innovations on BU Launchpad.`,
        images: [
          {
            url: builder.avatar,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${builder.name} | BU Launchpad`,
        description: `View ${builder.name}'s builder profile and innovations on BU Launchpad.`,
        images: [builder.avatar],
      },
    };
  } catch {
    return {
      title: "Builder Not Found | BU Launchpad",
      description: "This builder could not be found.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                           GENERATE STATIC PARAMS                           */
/* -------------------------------------------------------------------------- */
export async function generateStaticParams() {
  return db
    .select({ identifier: builderProfiles.userId })
    .from(builderProfiles);
}

/* -------------------------------------------------------------------------- */
/*                                  PROP TYPE                                 */
/* -------------------------------------------------------------------------- */
type Props = {
  params: Promise<{
    identifier: string;
  }>;
};

/* -------------------------------------------------------------------------- */
/*                               PAGE COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function BuilderProfilePagePage({ params }: Props) {
  return (
    <main className="wrapper px-4 sm:px-6 lg:px-8 pt-7 sm:pt-15 pb-8 sm:pb-10">
      <Suspense fallback={<BuilderProfilePageSkeleton />}>
        <BuilderProfilePageWrapper params={params} />
      </Suspense>
    </main>
  );
}
