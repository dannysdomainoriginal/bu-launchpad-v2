import type { FeedbackItem } from "@/components/dashboard/types";

interface FeedbackListProps {
  feedback: FeedbackItem[];
}

export default function FeedbackList({ feedback }: FeedbackListProps) {
  return (
    <div className="space-y-5">
      {feedback.map((item, index) => (
        <div
          key={item.id}
          className={
            index === feedback.length - 1
              ? "flex gap-4"
              : "flex gap-4 border-b border-border pb-5"
          }
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
            {item.initials}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{item.author}</h3>
            <p className="mt-1 text-muted-foreground">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
