import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RelativeTime } from "@/components/ui/RelativeTime";
import Image from "next/image";
import { ProductWithTags } from "@/lib/db/schema";

export default function ProductCard({
  slug,
  name,
  description,
  tags,
  voteCount,
  createdAt,
  image,
  authorName,
  authorAvatar,
  liveUrl,
}: ProductWithTags) {
  return (
    <article className="bg-white/5 backdrop-blur-md border border-white/5 rounded-lg overflow-hidden shadow-sm md:hover:scale-103 transition-all duration-300">
      <Link href={`/products/${slug}`} className="block hover:opacity-95">
        <div className="relative h-40 w-full bg-gray-900/40 overflow-hidden">
          <Image
            src={image}
            fill
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <Image
                width={32}
                height={32}
                src={authorAvatar}
                alt={authorName}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">{authorName}</div>
                <div className="text-[11px]">
                  <RelativeTime date={createdAt} />
                </div>
              </div>
            </div>

            <div className="text-sm font-medium">{voteCount} ★</div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2 py-1 bg-white/5 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {liveUrl && (
        <div className="p-3 border-t border-white/5 bg-white/2 flex justify-end">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-2 bg-white/5 rounded hover:bg-white/10 flex items-center gap-2"
          >
            Live
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </article>
  );
}
