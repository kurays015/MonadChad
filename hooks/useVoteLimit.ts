"use client";

import { useAccount, useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";

export function useVoteLimit() {
  const { address } = useAccount();

  const { data: hasReachedLimit } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "hasReachedVoteLimit",
    args: [address],
  }) as { data: boolean };

  return { hasReachedLimit };
}
