// hooks/useDApps.ts
import { votingAbi } from "@/lib/votingAbi";
import { useReadContract } from "wagmi";

export default function useDApps(
  contractAddress: `0x${string}`,
  dappCount: number | unknown
) {
  const maxDApps = 80;
  const dAppQueries = Array.from({ length: maxDApps }, (_, i) => i + 1).map(
    id => ({
      id,
      query: useReadContract({
        address: contractAddress,
        abi: votingAbi,
        functionName: "dapps",
        args: [BigInt(id)],
        query: {
          enabled: dappCount !== undefined && id <= Number(dappCount),
          // refetchInterval: 10000, // Refetch every 10 seconds
        },
      }),
    })
  );

  return dAppQueries
    .map(({ id, query }) => {
      const data = query.data as [string, bigint] | undefined;
      if (data && id <= Number(dappCount)) {
        return {
          id,
          name: data[0],
          voteCount: Number(data[1]) || 0,
        };
      }
      return null;
    })
    .filter(
      (
        dapp
      ): dapp is {
        id: number;
        name: string;
        voteCount: number;
      } => dapp !== null
    );
}
