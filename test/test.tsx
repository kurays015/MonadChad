"use client";

import { useEffect, useState } from "react";
import { useReadContract, useAccount } from "wagmi";
import { Address } from "viem";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";

// Interface for DApp struct
interface DApp {
  name: string;
  voteCount: bigint;
}

export default function Test() {
  // Fetch all dApps using getAllDApps
  const {
    data: dapps,
    error: dappError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getAllDApps",
  }) as { data: DApp[] | undefined; error: Error | null; isLoading: boolean };

  console.log(dapps, "DAPPS");

  return (
    <div>
      <h1>DApp Voting List</h1>
      {dapps?.length === 0 ? (
        <p>Loading dApps...</p>
      ) : (
        <ul>
          {dapps?.map((dapp, index) => (
            <li key={index}>
              <strong>{dapp.name}</strong>: {dapp.voteCount.toString()} votes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
