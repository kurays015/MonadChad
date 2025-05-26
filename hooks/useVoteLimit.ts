"use client";

import { useAccount, useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";

export function useVoteLimit() {
  const { address } = useAccount();

  const { data: voteInfo } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "votes",
    args: [address],
  });

  const voteCount = voteInfo ? Number((voteInfo as [bigint, number])[0]) : 0;
  const hasReachedLimit = voteCount >= 10;

  return { hasReachedLimit };
}
