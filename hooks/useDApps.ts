// hooks/useDApps.ts
import { contractAddress } from "@/lib/contract-address";
import { data } from "@/lib/data";
import { votingAbi } from "@/lib/votingAbi";
import { usePageStore } from "@/store/page-store";
import { useSearchStore } from "@/store/search-store";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { ReadContractErrorType } from "viem";
import { useReadContract } from "wagmi";

interface DApp {
  id: number;
  name: string;
  voteCount: bigint;
}

export default function useDApps() {
  const {
    data: dapps,
    error: dappsError,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getAllDApps",
  }) as {
    data: DApp[] | undefined;
    error: Error | null;
    isLoading: boolean;
    refetch: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
    isError: boolean;
    isSuccess: boolean;
  };

  const searchQuery = useSearchStore(state => state.searchQuery);
  const currentPage = usePageStore(state => state.currentPage);

  const dappsPerPage = 12;

  const sortedContractDataByVotes = dapps
    ? [...dapps].sort((a, b) => Number(b.voteCount) - Number(a.voteCount))
    : [];

  const dappsDataByVotes = sortedContractDataByVotes.map(contractData => {
    const match = data.find(
      d => d.id === contractData.id || d.name === contractData.name
    );

    return {
      id: match?.id,
      name: contractData.name,
      voteCount: Number(contractData.voteCount),
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

  return {
    dapps,
    dappsError,
    isError,
    isLoading,
    refetch,
    filteredDapps,
    paginatedDapps,
    dappsDataByVotes,
    isSuccess,
  };
}
