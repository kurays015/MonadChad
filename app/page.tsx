import Vote from "@/components/vote";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return <Vote />;
}
