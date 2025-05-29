"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
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
    functionName: "votes",
    args: [address],
  });

  const voteCount = voteInfo ? Number((voteInfo as VoteInfo)[0]) : 0;
  const lastResetDay = voteInfo ? Number((voteInfo as VoteInfo)[1]) : 0;
  const allTimeVotes = voteInfo ? Number((voteInfo as VoteInfo)[2]) : 0;

  const votesLeft = Math.max(0, 20 - voteCount);

  return {
    voteCount,
    votesLeft,
    allTimeVotes,
    lastResetDay,
    isLoading,
    error,
    address,
    isError,
  };
}
