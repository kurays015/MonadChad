"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWriteContract } from "wagmi";
import { useState } from "react";
import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { toast } from "sonner";
import TxToast from "./tx-toast";

export default function Content() {
  const [newDappName, setNewDappName] = useState("");
  const { writeContractAsync, isPending } = useWriteContract();
  const { openConnectModal } = useConnectModal();

  const handleAddDapp = async () => {
    if (!newDappName) return alert("Enter a name");

    await writeContractAsync(
      {
        address: contractAddress,
        abi: votingAbi,
        functionName: "addDApp",
        args: [newDappName],
      },
      {
        onSuccess: txHash => {
          toast(() => <TxToast txHash={txHash} />, {
            duration: 7000,
            unstyled: true,
          });
        },
        onError: error => {
          alert("Error adding dApp: " + (error as Error).message);
        },
      }
    );
    setNewDappName("");
  };

  return (
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
  );
}
