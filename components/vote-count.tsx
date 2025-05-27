"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { useAccount, useReadContract } from "wagmi";

export default function VoteCount() {
  const { address } = useAccount();

  const { data: voteInfo } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "votes",
    args: [address],
  });

  const voteCount = voteInfo ? Number((voteInfo as [bigint, number])[0]) : 0;

  const votesLeft = Math.max(0, 10 - voteCount);

  // # CHANGE ABI OF LATEST UPGRADABLE!

  return (
    <div>
      {address ? (
        <span className="drop-shadow-sm text-center py-1 px-4 rounded-2xl font-bold shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] transition-transform hover:scale-105 border border-[#2d2f36] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] text-white tracking-wide text-xs">
          {votesLeft} Votes Left
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
