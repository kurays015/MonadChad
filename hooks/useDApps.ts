import { contractAddress } from "@/lib/contract-address";
import { data } from "@/lib/data";
import { votingAbi } from "@/lib/votingAbi";
import { usePageStore } from "@/store/page-store";
import { useSearchStore } from "@/store/search-store";
import { DApp } from "@/types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { ReadContractErrorType } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function useDApps() {
  const currentPage = usePageStore(state => state.currentPage);
  const searchQuery = useSearchStore(state => state.searchQuery);

  // const dappPerPageLimit = 50;
  // const offset = (currentPage - 1) * dappPerPageLimit;

  // const {
  //   data: paginatedDapps,
  //   error: paginatedDappsError,
  //   isLoading: paginatedDappsLoading,
  //   isError: paginatedDappsIsError,
  //   refetch: paginatedDappsRefetch,
  //   isSuccess: paginatedDappsSuccess,
  // } = useReadContract({
  //   address: contractAddress,
  //   abi: votingAbi,
  //   functionName: "getPaginatedDApps",
  //   args: [BigInt(offset), BigInt(dappPerPageLimit)],
  // }) as {
  //   data: DApp[] | undefined;
  //   error: Error | null;
  //   isLoading: boolean;
  //   refetch: (
  //     options?: RefetchOptions
  //   ) => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
  //   isError: boolean;
  //   isSuccess: boolean;
  // };

  const { address } = useAccount();
  const {
    data: dapps,
    error: dappsError,
    isLoading,
    isError,
    refetch: voteCountRefetch,
    isSuccess,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getAllDApps",
    query: {
      retry: 5,
      retryDelay: 5000,
      enabled: !!address,
      retryOnMount: true,
      refetchOnWindowFocus: true,
      refetchIntervalInBackground: true,
    },
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

  const dappsDataByVotes =
    dapps && dapps.length > 0
      ? [...dapps]
          .sort((a, b) => Number(b.voteCount) - Number(a.voteCount))
          .map(contractData => {
            const match = data.find(
              d => d.id === contractData.id || d.name === contractData.name
            );
            return {
              id: match?.id ?? contractData.id,
              name: contractData.name,
              voteCount: Number(contractData.voteCount),
              url: match?.url,
              logo: match?.logo,
            };
          })
      : [];

  const filteredDapps = useMemo(() => {
    if (!searchQuery) return dappsDataByVotes;
    return dappsDataByVotes.filter(dapp =>
      dapp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, dappsDataByVotes]);

  const paginatedDapps = useMemo(() => {
    const dappsPerPage = 20;
    const start = (currentPage - 1) * dappsPerPage;
    const end = start + dappsPerPage;
    return filteredDapps.slice(start, end);
  }, [filteredDapps, currentPage]);

  return {
    dapps,
    dappsError,
    isError,
    isLoading,
    voteCountRefetch,
    dappsDataByVotes,
    isSuccess,
    paginatedDapps,
  };
}
