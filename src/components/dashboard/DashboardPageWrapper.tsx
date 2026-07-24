import { auth } from "@clerk/nextjs/server";

import DashboardPageClientWrapper from "./DashboardPageClientWrapper";

import DashboardSignInBox from "@/components/dashboard/DashboardSignInBox";

import { getProductsByUserId } from "@/modules/products/products.service";
import { getFeedbacksByUserId } from "@/modules/feedback/feedback.service";
import {
  getIncomingCollaborationRequests,
  getOutgoingCollaborationRequests,
} from "@/modules/collaboration/collaboration.service";
import { DashboardTabSchema } from "@/modules/dashboard/dashboard.schema";
import { getUserDashboardCounts } from "@/modules/dashboard/dashboard.service";
import { getEventsByUserId } from "@/modules/events/events.service";

export default async function DashboardPageWrapper({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [values, authContext] = await Promise.all([searchParams, auth()]);
  const tab = DashboardTabSchema.safeParse(values.tab).data || "overview";

  if (!authContext.userId) {
    return <DashboardSignInBox />;
  }

  const [
    userDashboardCounts,
    userInnovations,
    userFeedbacks,
    incomingRequests,
    outgoingRequests,
    userEvents,
  ] = await Promise.all([
    getUserDashboardCounts(authContext.userId),
    getProductsByUserId(authContext.userId, {}),
    getFeedbacksByUserId(authContext.userId),
    getIncomingCollaborationRequests(authContext.userId),
    getOutgoingCollaborationRequests(authContext.userId),
    getEventsByUserId(authContext.userId),
  ]);

  return (
    <DashboardPageClientWrapper
      initialTab={tab}
      counts={userDashboardCounts}
      products={userInnovations}
      feedbacks={userFeedbacks}
      incomingRequests={incomingRequests}
      outgoingRequests={outgoingRequests}
      events={userEvents}
    />
  );
}
