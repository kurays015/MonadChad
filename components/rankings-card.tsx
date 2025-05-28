import Rankings from "./rankings";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function RankingsCard() {
  return (
    <Card className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
      <CardHeader>
        <CardTitle
          className="bg-gradient-to-b from-white to-gray-600 text-2xl font-bold"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rankings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-white">
        <Rankings />
      </CardContent>
    </Card>
  );
}
