"use client";

import useUserVotingInfo from "@/hooks/useUserVotingInfo";

export default function UserTotalVotes() {
  const { allTimeVotes, address, isLoading } = useUserVotingInfo();

  if (!address) return null;

  if (isLoading) return <p className="text-gray-400 text-sm">Loading...</p>;

  return (
    <div className="text-gray-400 text-sm">Total Votes: {allTimeVotes}</div>
  );
}
