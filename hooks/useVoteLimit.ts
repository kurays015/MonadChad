"use client";

import { useAccount, useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";

export function useVoteLimit() {
  const { address } = useAccount();

  const { data: hasReachedLimit, refetch: voteLimitRefetch } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "hasReachedVoteLimit",
    args: [address],
  }) as {
    data: boolean;
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  };

  return { hasReachedLimit, voteLimitRefetch };
}
