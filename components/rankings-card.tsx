"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { useSearchStore } from "@/store/search-store";
import { data } from "@/lib/data";
import { useMemo } from "react";
import useDApps from "@/hooks/useDApps";
import { contractAddress } from "@/lib/contract-address";
import { useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";

export default function RankingsCard() {
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
    <Card className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
      <CardHeader>
        <CardTitle
          className="bg-gradient-to-b from-white to-gray-600 text-2xl font-bold"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rankings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-white">
        {rankingDapps
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
          })}
        <p className="text-sm text-muted-foreground mt-3">
          Total Votes: {totalVotes}
        </p>
      </CardContent>
    </Card>
  );
}
