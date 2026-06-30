import { ConnectionOptions, Job, Worker } from "bullmq";

import { redis } from "@/lib/redis";
import { EMAIL_JOB } from "./jobs";
import { handleFeedbackEmail } from "./processors/handleFeedbackEmail";
// import { handleCollaborationEmail } from "./processors/collaboration.processor";
// import { handleWelcomeEmail } from "./processors/welcome.processor";

export const emailWorker = new Worker(
  "email",
  async (job: Job) => {
    switch (job.name) {
      case EMAIL_JOB.FEEDBACK:
        await handleFeedbackEmail(job.data.feedbackId);
        break;

      // case EMAIL_JOB.COLLABORATION:
      //   await handleCollaborationEmail(job.data.requestId);
      //   break;

      // case EMAIL_JOB.WELCOME:
      //   await handleWelcomeEmail(job.data.userId);
      //   break;

      default:
        throw new Error(`Unknown email job: ${job.name}`);
    }
  },
  {
    connection: redis as unknown as ConnectionOptions,
    concurrency: 10,
    prefix: "bu-launchpad",
  },
);

emailWorker.on("completed", (job) => {
  console.log(`✅ ${job.name} completed (${job.id})`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ ${job?.name} failed (${job?.id})`, err);
});

emailWorker.on("error", (err) => {
  console.error("Email worker error:", err);
});
