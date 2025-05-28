"use client";

import React, { useEffect } from "react";

export default function Test() {
  async function main() {
    const MONAD_RPC = "https://testnet-rpc.monad.xyz/";

    try {
      const response = await fetch(MONAD_RPC, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: ["0x5686ac82D1BB3f1b3BCBa10DBB3170a11dc87236", "latest"],
          id: 1,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(`RPC Error: ${data.error.message}`);
      }

      console.log(data);

      // Convert hex balance to decimal and from wei to MON
      const balanceInWei = BigInt(data.result);
      const balanceInMON = Number(balanceInWei) / 1e18;

      return {
        balanceWei: balanceInWei.toString(),
        balanceMON: balanceInMON,
      };
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }

  useEffect(() => {
    main();
  }, []);

  return <div>test</div>;
}
