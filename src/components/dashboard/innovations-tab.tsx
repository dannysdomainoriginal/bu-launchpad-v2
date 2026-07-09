import {
  lookingForTeammatesData,
  trendingInnovationsData,
} from "@/app/dashboard/_data/innovations";
import InnovationCard from "@/components/dashboard/innovation-card";

export default function InnovationsTab() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          🔥 Trending Innovations
        </h2>
        <div className="grid-wrapper">
          {trendingInnovationsData.map((innovation) => (
            <InnovationCard key={innovation.id} innovation={innovation} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          🤝 Looking For Teammates
        </h2>
        <div className="grid-wrapper">
          {lookingForTeammatesData.map((innovation) => (
            <InnovationCard key={innovation.id} innovation={innovation} />
          ))}
        </div>
      </div>
    </div>
  );
}
