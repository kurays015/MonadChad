"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { ReadContractErrorType } from "viem";
import { VoteInfo } from "@/types";
import { useAccount, useReadContract } from "wagmi";

export default function useUserVotingInfo() {
  const { address } = useAccount();

  const {
    data: voteInfo,
    isLoading,
    error,
    isError,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getUserVoteInfo",
    args: [address],
    query: {
      enabled: !!address,
    },
  }) as {
    data: VoteInfo;
    isLoading: boolean;
    isError: boolean;
    error: ReadContractErrorType | null;
  };

  const voteCount = voteInfo ? Number(voteInfo.count) : 0;
  const totalVotes = voteInfo ? Number(voteInfo.totalVotes) : 0;

  const votesLeft = Math.max(0, 20 - voteCount);

  return {
    voteCount,
    votesLeft,
    totalVotes,
    isLoading,
    error,
    address,
    isError,
  };
}
