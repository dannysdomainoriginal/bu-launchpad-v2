import SuccessPageHeader from "./SuccessPageHeader";
import SuccessPageActions from "./SuccessPageActions";
import SubmissionSummarySection, {
  SubmissionSummarySectionProps,
} from "./SubmissionSummarySection";

type Props = {
  product: SubmissionSummarySectionProps["product"];
};

export function SubmissionSuccessPage({ product }: Props) {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <SuccessPageHeader />
        <SubmissionSummarySection product={product} />
        <SuccessPageActions />
      </div>
    </main>
  );
}
