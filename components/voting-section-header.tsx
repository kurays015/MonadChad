import { data } from "@/lib/data";

export default function VotingSectionHeader() {
  return (
    <div className="flex items-center justify-between flex-col">
      <h1
        className="bg-gradient-to-b from-white to-gray-600 lg:text-3xl customSm:text-lg md:text-xl font-bold"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Vote Your Favorite Monad dApp
      </h1>
      <p className="text-sm text-muted-foreground mt-2">{data.length} dApps</p>
    </div>
  );
}
