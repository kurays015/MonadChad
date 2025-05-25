import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SeachBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search dApps by name..."
        className="!border-none !outline-none focus:!ring-0 focus:!border-none focus:!outline-none bg-[#0c0c0c] text-white py-6 px-10 border-gray-800 border rounded-xl"
      />
    </div>
  );
}
