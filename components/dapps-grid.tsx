"use client";

import useDApps from "@/hooks/useDApps";
import DappGridCard from "./dapp-grid-card";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function DappsGrid() {
  const { address } = useAccount();

  const {
    dapps,
    dappsError,
    isError,
    isLoading,
    dappsDataByVotes,
    voteCountRefetch,
    paginatedDapps,
  } = useDApps();

  if (isLoading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
        <p className="text-muted-foreground text-center">Loading...</p>
      </div>
    );
  }

  if (isError)
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
        <p className="text-muted-foreground col-span-full text-center mb-4">
          No dApp found... {dappsError?.message}
        </p>
        <Button
          onClick={() => voteCountRefetch()}
          className="px-4 py-2 bg-[#6E54FF] text-white rounded-md hover:bg-[#5a44cc] transition"
        >
          Retry
        </Button>
      </div>
    );

  return (
    <>
      {!address ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
          <Image src="/Chog.png" width={100} height={100} alt="chog" />
          <p className="text-slate-400">Connect a wallet first...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 customSm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedDapps.length > 0 ? (
            paginatedDapps.map(dapp => <DappGridCard key={dapp.id} {...dapp} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
              <p className="text-muted-foreground col-span-full text-center">
                No dApps found...
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
