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
    isLoading: voteInfoLoading,
    isError: voteInfoError,
    error: voteInfoErrorObj,
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
  };
}
