"use client";

import useDApps from "@/hooks/useDApps";
import DappGridCard from "./dapp-grid-card";
import { Loader2 } from "lucide-react";

export default function DappsGrid() {
  const { dapps, dappsError, isError, isLoading, paginatedDapps } = useDApps();

  if (isError)
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
        <p className="text-muted-foreground col-span-full text-center ">
          No dApp found...{dappsError?.message}
        </p>
      </div>
    );

  if (isLoading) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
        <p className="text-muted-foreground text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {!dapps?.length ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
          <Loader2 className="w-10 h-10 text-[#6E54FF] animate-spin mb-2" />
          <p className="text-muted-foreground text-center">Loading...</p>
        </div>
      ) : paginatedDapps.length > 0 ? (
        paginatedDapps.map(dapp => <DappGridCard key={dapp.id} {...dapp} />)
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 h-[60vh]">
          <p className="text-muted-foreground col-span-full text-center">
            No dApp found...
          </p>
        </div>
      )}
    </div>
  );
}
