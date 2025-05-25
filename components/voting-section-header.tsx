export default function VotingSectionHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between">
      <h1
        className="bg-gradient-to-b from-white to-gray-600 text-2xl font-bold"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Vote Your Favorite Monad dApp
      </h1>
      <p className="text-sm text-muted-foreground">{count} dApps</p>
    </div>
  );
}
