"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { useReadContract } from "wagmi";
import { format } from "date-fns";

export default function VoteCountdown() {
  const { data: nextResetTimestamp } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getNextResetTimestamp",
  });

  if (!nextResetTimestamp) {
    return <div className="text-sm text-gray-400 my-4">Loading...</div>;
  }

  const millis = Number(nextResetTimestamp) * 1000;
  const isValid = !isNaN(millis);
  const timeOnlyUTC = isValid
    ? format(new Date(millis), "HH:mm:ss") + " UTC"
    : "Invalid time";

  // # CHANGE ABI OF LATEST UPGRADABLE!

  return (
    <div className="text-sm text-gray-400 my-4">
      10 votes per user, reset time: {timeOnlyUTC}
    </div>
  );
}
