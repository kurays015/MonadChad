"use client";

import useUserVotingInfo from "@/hooks/useUserVotingInfo";

export default function UserTotalVotes() {
  const { address, isLoading, error, isError, totalVotes } =
    useUserVotingInfo();

  if (!address) return null;

  if (isError) return <p className="text-gray-400 text-sm">{error?.message}</p>;

  if (isLoading) return <p className="text-gray-400 text-sm">Loading...</p>;

  return (
    <div className="text-gray-400 customSm:text-xs md:text-sm lg:text-base">
      Total Votes: {totalVotes}
    </div>
  );
}
