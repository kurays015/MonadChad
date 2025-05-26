"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function AddDapp() {
  const [newDappName, setNewDappName] = useState("");
  const { address, isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "owner",
  });
  const { openConnectModal } = useConnectModal();

  const handleAddDapp = async () => {
    if (!newDappName) return alert("Enter a name");

    try {
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: votingAbi,
        functionName: "addDApp",
        args: [newDappName],
      });
      setNewDappName("");

      // await new Promise(resolve => setTimeout(resolve, 3000));

      if (txHash) {
        toast(
          <div className="flex items-center space-x-5">
            Transaction Successful!{" "}
            <Link
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <ExternalLink className="w-4 h-4 mr-1 ml-40 z-40" />
            </Link>
          </div>,
          {
            duration: 5000,
          }
        );
      }
    } catch (error) {
      alert("Error adding dApp: " + (error as Error).message);
    }
  };

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
      <CardContent>
        <div className="relative flex border-gray-800 border rounded-xl overflow-hidden">
          <Input
            value={newDappName}
            onChange={e => setNewDappName(e.target.value)}
            placeholder="Enter a name"
            disabled={isPending}
            className="!border-none customSm:placeholder:text-xs lg:placeholder:text-lg md:placeholder:text-base !outline-none focus:!ring-0 focus:!border-none focus:!outline-none bg-[#0c0c0c] text-white py-6 px-4"
          />
          <Button
            className="absolute right-1 top-1 inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-[6px] min-w-[105px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#6E54FF] text-white shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.33)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] hover:bg-[#836EF9] hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-[500] w-fit z-10"
            onClick={openConnectModal ? openConnectModal : handleAddDapp}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add dApp"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
