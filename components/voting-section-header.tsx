import { data } from "@/lib/data";
import VoteCount from "./vote-count";

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
      <div className="flex items-center justify-center gap-2 w-full mt-4">
        <p className="text-sm text-muted-foreground font-semibold">
          {data.length} dApps
        </p>
        <VoteCount />
      </div>
      <p className="italic mt-2 text-xs font-medium text-[#C3B6FF] bg-[#2a174a]/60 px-3 py-1 rounded-lg shadow-sm">
        reset every 4AM UTC
      </p>
    </div>
  );
}
