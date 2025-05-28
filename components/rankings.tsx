"use client";

import Image from "next/image";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { useSearchStore } from "@/store/search-store";
import { data } from "@/lib/data";
import { useMemo } from "react";
import useDApps from "@/hooks/useDApps";
import { contractAddress } from "@/lib/contract-address";
import { useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { Loader2 } from "lucide-react";

export default function Rankings() {
  const { data: dappCount } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "dappCount",
  });
  const dapps = useDApps(contractAddress, dappCount);

  const sortedContractDataByVotes = dapps.sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const dappsDataByVotes = sortedContractDataByVotes.map(contractData => {
    const match = data.find(
      d => d.id === contractData.id || d.name === contractData.name
    );
    return {
      id: contractData.id,
      name: contractData.name,
      voteCount: contractData.voteCount,
      url: match?.url || "",
      logo: match?.logo,
    };
  });

  const totalVotes = dapps.reduce((sum, dapp) => sum + dapp.voteCount, 0);

  const searchQuery = useSearchStore(state => state.searchQuery);

  const filteredDapps = useMemo(() => {
    if (!searchQuery) return dappsDataByVotes;
    return dappsDataByVotes.filter(dapp =>
      dapp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dappsDataByVotes]);

  const rankingDapps =
    filteredDapps && filteredDapps?.length
      ? [...filteredDapps]
      : [...dappsDataByVotes];

  return (
    <>
      {rankingDapps.length ? (
        rankingDapps
          .sort((a, b) => {
            const voteCountA =
              dapps.find(item => item.id === a.id)?.voteCount || 0;
            const voteCountB =
              dapps.find(item => item.id === b.id)?.voteCount || 0;
            return voteCountB - voteCountA; // Descending order
          })
          .slice(0, 15) // Show top 10 for brevity
          .map(dapp => {
            const percent =
              totalVotes > 0
                ? ((dapps.find(item => item.id === dapp.id)?.voteCount || 0) /
                    totalVotes) *
                  100
                : 0;

            return (
              <div key={dapp.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center space-x-2">
                    {dapp.logo && (
                      <Image
                        src={dapp.logo}
                        blurDataURL={dapp.logo}
                        placeholder="blur"
                        alt={`${dapp.name} logo`}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <Link
                      href={dapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {dapp.name} {"----->"} {dapp.voteCount}
                    </Link>
                  </span>
                  <span>{percent.toFixed(2)}%</span>
                </div>
                <Progress value={percent} className="h-2 text-white bg-white" />
              </div>
            );
          })
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
          <p className="text-muted-foreground text-center">Loading...</p>
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-3">
        Total Votes: {totalVotes}
      </p>
    </>
  );
}
