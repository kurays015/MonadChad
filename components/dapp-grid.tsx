// import { useAccount, useReadContract } from "wagmi";
// import { contractAddress } from "@/lib/contract-address";
// import { votingAbi } from "@/lib/votingAbi";
// import { Dispatch, SetStateAction, useMemo, useState } from "react";
// import DappGridCard from "./dapp-grid-card";

// type DappGridProps = {
//   id: number;
//   name: string;
//   logo: string;
//   url: string;
// };

// type Dapp = {
//   id: number;
//   name: string;
//   voteCount: number;
// };

// export default function DappGrid({
//   filteredDapps,
//   setTransactionError,
//   loadingDappId,
//   dapps,
// }: {
//   filteredDapps: DappGridProps[];
//   setTransactionError: Dispatch<SetStateAction<string | null>>;
//   loadingDappId: number | null;
//   dapps: Dapp[];
// }) {
//   const [currentPage] = useState(1);
//   const dappsPerPage = 12;
//   const { address } = useAccount();

//   const { data: voteInfo } = useReadContract({
//     address: contractAddress,
//     abi: votingAbi,
//     functionName: "votes",
//     args: [address],
//   });

//   const voteCount = voteInfo ? Number((voteInfo as [bigint, number])[0]) : 0;

//   const paginatedDapps = useMemo(() => {
//     const start = (currentPage - 1) * dappsPerPage;
//     const end = start + dappsPerPage;
//     return filteredDapps.slice(start, end);
//   }, [filteredDapps, currentPage]);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {paginatedDapps.length > 0 ? (
//         paginatedDapps.map(dapp => {
//           const findVote = dapps?.find(d => d.name === dapp.name)?.voteCount;

//           return "test";
//           // <DappGridCard
//           //   findVote={findVote}
//           //   {...dapp}
//           //   loadingDappId={loadingDappId}
//           //   // setSelectedOption={setSelectedOption}
//           //   setTransactionError={setTransactionError}
//           // />
//         })
//       ) : (
//         <p className="text-muted-foreground col-span-full text-center">
//           No dApps found.
//         </p>
//       )}
//     </div>
//   );
// }

export default function Test() {
  return <div>dapp-grid</div>;
}
