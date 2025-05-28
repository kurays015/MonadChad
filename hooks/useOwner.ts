import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { useReadContract } from "wagmi";

export default function useOwner() {
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "owner",
  });

  return { ownerAddress };
}
