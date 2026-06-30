import { ConnectionOptions, Queue } from "bullmq";

import { redis } from "@/lib/redis";
import { EMAIL_JOB } from "./jobs";

const emailQueue = new Queue("email", {
  connection: redis as unknown as ConnectionOptions,
  prefix: "bu-launchpad",
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: 1000,
    removeOnFail: 5000,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

export async function queueFeedbackEmail(feedbackId: string) {
  await emailQueue.add(
    EMAIL_JOB.FEEDBACK,
    { feedbackId },
    {
      jobId: `feedback_${feedbackId}`,
    },
  );
}

export async function queueCollaborationEmail(requestId: string) {
  await emailQueue.add(
    EMAIL_JOB.COLLABORATION,
    { requestId },
    {
      jobId: `collaboration_${requestId}`,
    },
  );
}

export async function queueWelcomeEmail(userId: string) {
  await emailQueue.add(
    EMAIL_JOB.WELCOME,
    { userId },
    {
      jobId: `welcome_${userId}`,
    },
  );
}
