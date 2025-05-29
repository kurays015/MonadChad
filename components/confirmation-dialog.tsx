"use client";

import { useVotingStore } from "@/store/voting-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useVoteLimit } from "@/hooks/useVoteLimit";
import { Card, CardContent } from "./ui/card";
import TxToast from "./tx-toast";

export default function ConfirmationDialog() {
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, error: receiptError } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  const selectedOption = useVotingStore(state => state.selectedOption);
  const setSelectedOption = useVotingStore(state => state.setSelectedOption);
  const transactionError = useVotingStore(state => state.transactionError);
  const setTransactionError = useVotingStore(
    state => state.setTransactionError
  );
  const setLoadingDappId = useVotingStore(state => state.setLoadingDappId);
  const { hasReachedLimit } = useVoteLimit();

  const confirmVote = async () => {
    if (!selectedOption) return;
    setLoadingDappId(selectedOption.id);
    setTransactionError(null);

    await writeContractAsync(
      {
        address: contractAddress,
        abi: votingAbi,
        functionName: "vote",
        args: [BigInt(selectedOption.id)],
      },
      {
        onSuccess: txHash => {
          setSelectedOption(null);
          setLoadingDappId(null);
          toast(() => <TxToast txHash={txHash} />, {
            duration: 7000,
            unstyled: true,
          });
        },
        onError: error => {
          console.error("Vote failed:", error);
          setTransactionError("Vote failed: " + (error as Error).message);
          setLoadingDappId(null);
        },
      }
    );
  };

  return (
    <AlertDialog open={!!selectedOption && !hasReachedLimit}>
      <AlertDialogContent className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Confirm Vote
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            You selected{" "}
            <span className="font-semibold text-white">
              {selectedOption?.name}
            </span>
            . Are you sure you want to proceed?
            {transactionError && (
              <span className="text-red-600 block mt-2 break-all whitespace-pre-wrap max-h-64 overflow-auto">
                {transactionError}
              </span>
            )}
            {isConfirming && (
              <span className="text-blue-500 block mt-2">
                Waiting for transaction confirmation...
              </span>
            )}
            {receiptError && (
              <Card className="bg-[#1A1D21] border-red-500 shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
                <CardContent className="pt-4">
                  <p className="text-red-600 text-sm">
                    Transaction Error: {receiptError.message}
                  </p>
                </CardContent>
              </Card>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setSelectedOption(null)}
            className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-[6px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#0c0c0c] text-white border border-transparent shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] hover:bg-[#0c0c0c] hover:text-white  hover:border-[#6E54FF] hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-medium"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={confirmVote}
            disabled={isPending || isConfirming}
            className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-[6px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#6E54FF] text-white border border-transparent shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.33)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] hover:bg-[#836EF9] hover:border-purple-500 hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-[500]"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isConfirming ? "Confirming..." : "Submitting..."}
              </>
            ) : (
              "Confirm Vote"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
