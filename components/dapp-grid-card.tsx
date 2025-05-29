"use client ";

import Image from "next/image";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { LinkIcon, Loader2 } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useVotingStore } from "@/store/voting-store";
import { useVoteLimit } from "@/hooks/useVoteLimit";
import type { DappGridCardProps } from "@/types";

export default function DappGridCard({
  id,
  logo,
  name,
  url,
  voteCount,
}: DappGridCardProps) {
  const { openConnectModal } = useConnectModal();
  const { hasReachedLimit } = useVoteLimit();

  const setSelectedOption = useVotingStore(state => state.setSelectedOption);
  const setTransactionError = useVotingStore(
    state => state.setTransactionError
  );
  const loadingDappId = useVotingStore(state => state.loadingDappId);

  const handleVote = (dapp: { id: number; name: string }) => {
    if (hasReachedLimit) return;
    setSelectedOption(dapp);
    setTransactionError(null);
  };

  const placeholder =
    "https://cdn.prod.website-files.com/667c57e6f9254a4b6d914440/667d7104644c621965495f6e_LogoMark.svg";

  return (
    <Card
      key={id}
      className="bg-[#1A1D21] border-none shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000] transition-transform hover:scale-105"
    >
      <CardHeader className="relative gap-4">
        <CardTitle className="flex items-center space-x-2 text-white">
          <Image
            src={!logo ? placeholder : logo}
            alt={`${name} logo`}
            blurDataURL={logo}
            placeholder="blur"
            width={40}
            height={40}
            className="rounded-full"
          />

          <Link
            href={url || ""}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {name}
          </Link>

          <Link href={url || ""} target="_blank" rel="noopener noreferrer">
            <div className="absolute right-2 top-5 -translate-y-1/2 flex items-center justify-center w-6 h-6 border border-white/20 rounded-full transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] hover:border-[#6E54FF] hover:shadow-[0_0_8px_#6E54FF,0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)]">
              <LinkIcon className="w-3 h-3 text-white" />
            </div>
          </Link>
        </CardTitle>
        <p className="text-xs font-semibold px-3 py-1 rounded-full bg-[#23262b] text-gray-400 w-fit mt-2 shadow-sm border border-[#2d2f36]">
          <span className="text-purple-400">{voteCount}</span> vote
          {voteCount !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 gap-[6px] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#6E54FF] text-white shadow-[0px_1px_0.5px_0px_rgba(255,255,255,0.33)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] hover:bg-[#836EF9] hover:shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(26,19,161,0.50),0px_0px_0px_1px_#4F47EB] h-10 px-4 py-[6px] rounded-[100px] text-[14px] leading-[24px] font-[500] disabled:cursor-not-allowed disabled:pointer-events-auto"
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
          ) : hasReachedLimit ? (
            "No votes left"
          ) : (
            "Vote"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
