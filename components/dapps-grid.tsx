"use client";

import useDApps from "@/hooks/useDApps";
import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { usePageStore } from "@/store/page-store";
import { useMemo, useState } from "react";
import { useReadContract } from "wagmi";
import DappGridCard from "./dapp-grid-card";
import { useSearchStore } from "@/store/search-store";
import { data } from "@/lib/data";
import { Loader2 } from "lucide-react";

export default function DappsGrid() {
  const currentPage = usePageStore(state => state.currentPage);
  const { data: dappCount } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "dappCount",
  });
  const dapps = useDApps(contractAddress, dappCount);

  const dappsPerPage = 12;
  const searchQuery = useSearchStore(state => state.searchQuery);

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
      url: match?.url,
      logo: match?.logo,
    };
  });

  const filteredDapps = useMemo(() => {
    if (!searchQuery) return dappsDataByVotes;
    return dappsDataByVotes.filter(dapp =>
      dapp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dappsDataByVotes]);

  const paginatedDapps = useMemo(() => {
    const start = (currentPage - 1) * dappsPerPage;
    const end = start + dappsPerPage;
    return filteredDapps.slice(start, end);
  }, [filteredDapps, currentPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {!dapps.length ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16">
          <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
          <p className="text-muted-foreground text-center">Loading...</p>
        </div>
      ) : paginatedDapps.length > 0 ? (
        paginatedDapps.map(dapp => {
          return <DappGridCard key={dapp.id} {...dapp} />;
        })
      ) : (
        <p className="text-muted-foreground col-span-full text-center">
          No dApp found
        </p>
      )}
    </div>
  );
}
