import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { LinkIcon, Loader2 } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Dispatch, SetStateAction } from "react";
import { useAccount, useReadContract } from "wagmi";
import { votingAbi } from "@/lib/votingAbi";
import { contractAddress } from "@/lib/contract-address";

type DappGridCardProps = {
  id: number;
  name: string;
  url: string;
  logo: string;
  findVote: number | undefined;
  setSelectedOption: Dispatch<
    SetStateAction<{ id: number; name: string } | null>
  >;
  setTransactionError: Dispatch<SetStateAction<string | null>>;
  loadingDappId: number | null;
};

export default function DappGridCard({
  id,
  logo,
  name,
  url,
  findVote,
  setSelectedOption,
  setTransactionError,
  loadingDappId,
}: DappGridCardProps) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { data: voteInfo } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "votes",
    args: [address],
  });

  const voteCount = voteInfo ? Number((voteInfo as [bigint, number])[0]) : 0;
  const hasReachedLimit = voteCount >= 10;

  const handleVote = (dapp: { id: number; name: string }) => {
    if (!isConnected) return alert("Please connect your wallet.");
    if (hasReachedLimit)
      return alert("You’ve reached your 10-vote daily limit.");
    setSelectedOption(dapp);
    setTransactionError(null);
  };

  return (
    <Card
      key={id}
      className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000] transition-transform hover:scale-105"
    >
      <CardHeader className="relative">
        <CardTitle className="flex items-center space-x-2 text-white">
          {logo && (
            <Image
              src={logo}
              alt={`${name} logo`}
              blurDataURL={logo}
              placeholder="blur"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {name}
          </Link>

          <Link href={url} target="_blank" rel="noopener noreferrer">
            <div className="absolute right-2 top-5 -translate-y-1/2 flex items-center justify-center w-6 h-6 border border-white/20 rounded-full transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] hover:border-[#6E54FF] hover:shadow-[0_0_8px_#6E54FF,0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)]">
              <LinkIcon className="w-3 h-3 text-white" />
            </div>
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {findVote ? findVote : 0} vote
          {findVote && findVote >= 2 ? "s" : ""}
        </p>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-[6px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#6E54FF] text-white shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.33)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] hover:bg-[#836EF9] hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-[500]"
          onClick={
            openConnectModal ? openConnectModal : () => handleVote({ id, name })
          }
          disabled={hasReachedLimit || loadingDappId !== null}
        >
          {loadingDappId === id ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Voting...
            </>
          ) : (
            "Vote"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
