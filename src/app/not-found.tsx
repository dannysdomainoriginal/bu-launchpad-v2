import Link from "next/link";

export default function GlobalNotFoundPage() {
  return (
    <div>
      <h1>Sorry we couldn't find the page we are looking for</h1>
      <Link href={"/"} className="text-primary underline hover:text-accent-foreground">Go Home</Link>
    </div>
  );
}
