import Image from "next/image";

import type { FeedbackItem } from "@/components/dashboard/types";

interface FeedbackListProps {
  feedbacks: FeedbackItem[];
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  return (
    <div className="space-y-5">
      {feedbacks.map((item, index) => (
        <div
          key={item.id}
          className={
            index === feedbacks.length - 1
              ? "flex gap-4"
              : "flex gap-4 border-b border-border pb-5"
          }
        >
          {item.avatar ? (
            <Image
              src={item.avatar}
              alt={item.author}
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground capitalize">
              {item.author.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-medium text-foreground">{item.author}</h3>
              <p className="text-sm text-muted-foreground">on</p>
              <p className="font-medium text-foreground">{item.productName}</p>
            </div>

            <p className="mt-1 text-muted-foreground">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
