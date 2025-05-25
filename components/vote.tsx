"use client";

import { useState, useMemo } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import useDApps from "@/hooks/useDApps";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
import { Progress } from "./ui/progress";
import { ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/lib/data";
import VotingSectionHeader from "./voting-section-header";
import AddDapp from "./add-dapp";
import Header from "./header";
import DappGridCard from "./dapp-grid-card";
import Pagination from "./pagination";
import SeachBar from "./search-bar";
import { contractAddress } from "@/lib/contract-address";
import { toast } from "sonner";

export default function Vote() {
  const [isVoting, setIsVoting] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [loadingDappId, setLoadingDappId] = useState<number | null>(null);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dappsPerPage = 12;

  const { data: dappCount } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "dappCount",
  });

  // Use dappCount directly
  const dapps = useDApps(contractAddress, dappCount);

  const { data: voteInfo } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "votes",
    args: [address],
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const voteCount = voteInfo ? Number((voteInfo as [bigint, number])[0]) : 0;
  const hasReachedLimit = voteCount >= 10;

  const totalVotes = dapps.reduce((sum, dapp) => sum + dapp.voteCount, 0);

  // Filter and paginate dApps
  const filteredDapps = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(dapp =>
      dapp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [, searchQuery]);

  const paginatedDapps = useMemo(() => {
    const start = (currentPage - 1) * dappsPerPage;
    const end = start + dappsPerPage;
    return filteredDapps.slice(start, end);
  }, [filteredDapps, currentPage]);

  const totalPages = Math.ceil(filteredDapps.length / dappsPerPage);

  const confirmVote = async () => {
    if (!selectedOption) return;
    setIsVoting(true);
    setLoadingDappId(selectedOption.id);
    setTransactionError(null);

    try {
      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: votingAbi,
        functionName: "vote",
        args: [BigInt(selectedOption.id)],
      });
      setTransactionHash(txHash);

      console.log(txHash, "Transaction hash");

      if (txHash) {
        toast(
          <div className="flex items-center space-x-5">
            Transaction Successful!{" "}
            <a
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <ExternalLink className="w-4 h-4 mr-1 ml-40" />
            </a>
          </div>,
          {
            duration: 5000,
          }
        );
      }
    } catch (error) {
      console.error("Vote failed:", error);
      setTransactionError("Vote failed: " + (error as Error).message);
      setIsVoting(false);
      setLoadingDappId(null);
    }
  };

  if (isConfirmed && !isConfirming) {
    setSelectedOption(null);
    setIsVoting(false);
    setLoadingDappId(null);
    setTransactionHash(undefined);
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Header />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Add dApp */}
            <AddDapp />

            {/* Voting Section */}
            <div className="space-y-4">
              <VotingSectionHeader count={filteredDapps.length} />

              {/* Search Bar */}
              <SeachBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* saka na ilagay DappGrid */}
              {/* <DappGrid setTransactionError={setTransactionError} /> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedDapps.length > 0 ? (
                  paginatedDapps.map(dapp => {
                    const findVote = dapps?.find(
                      d => d.name === dapp.name
                    )?.voteCount;

                    return (
                      <DappGridCard
                        key={dapp.id}
                        findVote={findVote}
                        {...dapp}
                        loadingDappId={loadingDappId}
                        setSelectedOption={setSelectedOption}
                        setTransactionError={setTransactionError}
                      />
                    );
                  })
                ) : (
                  <p className="text-muted-foreground col-span-full text-center">
                    No dApps found.
                  </p>
                )}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
              <CardHeader>
                <CardTitle
                  className="bg-gradient-to-b from-white to-gray-600 text-2xl font-bold"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white">
                {[...filteredDapps]
                  .sort((a, b) => {
                    const voteCountA =
                      dapps.find(item => item.id === a.id)?.voteCount || 0;
                    const voteCountB =
                      dapps.find(item => item.id === b.id)?.voteCount || 0;
                    return voteCountB - voteCountA; // Descending order
                  })
                  .slice(0, 10) // Show top 10 for brevity
                  .map(dapp => {
                    const percent =
                      totalVotes > 0
                        ? ((dapps.find(item => item.id === dapp.id)
                            ?.voteCount || 0) /
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
                              {dapp.name}
                            </Link>
                          </span>
                          <span>{percent.toFixed(2)}%</span>
                        </div>
                        <Progress
                          value={percent}
                          className="h-2 text-white bg-white"
                        />
                      </div>
                    );
                  })}
                <p className="text-sm text-muted-foreground mt-3">
                  Total Votes: {totalVotes}
                </p>
              </CardContent>
            </Card>

            {receiptError && (
              <Card className="bg-[#1A1D21] border-red-500 shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
                <CardContent className="pt-4">
                  <p className="text-red-600 text-sm">
                    Transaction Error: {receiptError.message}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Alert Dialog */}
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
                  <span className="text-red-600 block mt-2">
                    {transactionError}
                  </span>
                )}
                {isConfirming && (
                  <span className="text-blue-500 block mt-2">
                    Waiting for transaction confirmation...
                  </span>
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
                disabled={isVoting || isConfirming}
                className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-[6px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#6E54FF] text-white border border-transparent shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.33)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] hover:bg-[#836EF9] hover:border-purple-500 hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-[500]"
              >
                {isVoting || isConfirming ? (
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
      </div>
    </div>
  );
}
