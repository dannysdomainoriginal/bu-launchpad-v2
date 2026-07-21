import { RelativeTime } from "@/components/ui/RelativeTime";

type Props = {
  innovations: number;
  totalVotes: number;
  memberSince: Date;
};

export default function BuilderProfileStats({
  innovations,
  totalVotes,
  memberSince,
}: Props) {
  return (
    /* Changed grid-cols-3 to grid-cols-2 on mobile, sm:grid-cols-3 on desktop */
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4">
      <div className="flex flex-col items-center justify-center rounded-xl bg-muted/40 p-3 text-center transition-colors hover:bg-muted/60 sm:p-4">
        <span className="text-xl font-extrabold sm:text-2xl">
          {innovations}
        </span>
        <span className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
          Innovation{innovations === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl bg-muted/40 p-3 text-center transition-colors hover:bg-muted/60 sm:p-4">
        <span className="text-xl font-extrabold sm:text-2xl">{totalVotes}</span>
        <span className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
          Vote{totalVotes === 1 ? "" : "s"}
        </span>
      </div>

      {/* Added col-span-2 on mobile, resets to sm:col-span-1 on desktop */}
      <div className="col-span-2 flex flex-col items-center justify-center rounded-xl bg-muted/40 p-3 text-center transition-colors hover:bg-muted/60 sm:col-span-1 sm:p-4">
        <span className="text-base font-bold sm:text-lg">
          <RelativeTime date={memberSince} />
        </span>
        <span className="mt-0.5 text-xs font-medium text-muted-foreground sm:text-sm">
          Joined
        </span>
      </div>
    </div>
  );
}
