"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { ReadContractErrorType } from "viem";
import { VoteInfo } from "@/types";
import { useAccount, useReadContract } from "wagmi";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export default function useUserVotingInfo() {
  const { address } = useAccount();

  const {
    data: voteInfo,
    isLoading: voteInfoLoading,
    isError: voteInfoError,
    error: voteInfoErrorObj,
    refetch: remainingVoteCountRefetch,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getUserVoteInfo",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  }) as {
    data: VoteInfo | undefined;
    isLoading: boolean;
    isError: boolean;
    error: ReadContractErrorType | null;
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  };

  const { data: currentVotingDay, isLoading: dayLoading } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getCurrentVotingDay",
    query: { enabled: !!address },
  });

  const voteCount =
    voteInfo && voteInfo.lastResetDay === currentVotingDay
      ? Number(voteInfo.count)
      : 0;

  const totalVotes = voteInfo ? Number(voteInfo.totalVotes) : 0;
  const votesLeft = Math.max(0, 20 - voteCount);

  return {
    voteCount,
    votesLeft,
    totalVotes,
    isLoading: voteInfoLoading || dayLoading,
    error: voteInfoErrorObj,
    address,
    isError: voteInfoError,
    remainingVoteCountRefetch,
  };
}
