import Vote from "@/components/vote";
// import { contractAddress } from "@/lib/contract-address";
// import { votingAbi } from "@/lib/votingAbi";
// import { createPublicClient, http } from "viem";
// import { monadTestnet } from "viem/chains";

// export const publicClient = createPublicClient({
//   chain: monadTestnet,
//   transport: http(),
// });

// const wagmiContract = {
//   address: contractAddress,
//   abi: votingAbi,
// } as const;
export const dynamic = "force-dynamic";

export default async function Home() {
  // const results = await publicClient.multicall({
  //   contracts: [
  //     {
  //       ...wagmiContract,
  //       functionName: "getPaginatedDApps",
  //       args: [0, 65],
  //     },
  //     {
  //       ...wagmiContract,
  //       functionName: "owner",
  //     },
  //   ],
  //   batchSize: 50000,
  //   allowFailure: false,
  // });

  // console.log(results[0].result, "results");

  return <Vote />;
}
