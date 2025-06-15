"use client";

import Image from "next/image";
import Link from "next/link";
import { Progress } from "./ui/progress";
import useDApps from "@/hooks/useDApps";
import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

export default function Rankings() {
  const { address } = useAccount();
  const { dapps, isError, isLoading, dappsDataByVotes, dappsError } =
    useDApps();

  if (isError)
    return (
      <p className="text-gray-400 text-sm text-center">
        No rankings found... {dappsError?.message}
      </p>
    );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
        <p className="text-muted-foreground text-center">Loading...</p>
      </div>
    );
  }

  const totalVotes = dapps?.reduce(
    (sum, dapp) => sum + Number(dapp.voteCount),
    0
  );

  return (
    <>
      {!address ? (
        <p className="text-slate-400">Connect a wallet first...</p>
      ) : (
        dappsDataByVotes
          .slice(0, 20) // Show top 20 for brevity
          .map(dapp => {
            const percent =
              totalVotes && totalVotes > 0
                ? (dapp.voteCount / totalVotes) * 100
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
                      href={dapp.url || ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {dapp.name} {"----->"} {dapp.voteCount}
                    </Link>
                  </span>
                  <span>{percent.toFixed(2)}%</span>
                </div>
                <Progress value={percent} className="h-2 text-white bg-white" />
              </div>
            );
          })
      )}
      <p className="text-sm text-muted-foreground mt-3">
        Total Votes: {totalVotes}
      </p>
    </>
  );
}
