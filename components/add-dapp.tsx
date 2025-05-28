"use client";

import { useAccount, useReadContract } from "wagmi";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";
import Content from "./add-dapp-content";

export default function AddDapp() {
  const { address, isConnected } = useAccount();

  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "owner",
  });

  return (
    <Card
      className={`${isConnected && ownerAddress === address ? "block" : "hidden"} bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000] relative`}
    >
      <CardHeader>
        <CardTitle
          className="bg-gradient-to-b from-white to-gray-600 text-2xl font-bold"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Add a dApp
        </CardTitle>
      </CardHeader>
      <Content />
    </Card>
  );
}
