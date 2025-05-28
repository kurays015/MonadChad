import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TxToast({
  txHash,
}: {
  txHash: `0x${string}` | undefined;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2a174a] via-[#6E54FF] to-[#836EF9] shadow-lg border border-[#6E54FF] font-semibold text-white text-base drop-shadow-sm  ">
      <span className="">Transaction Successful!</span>
      <Link
        href={`https://testnet.monadexplorer.com/tx/${txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-[#C3B6FF] hover:text-white underline"
      >
        <ExternalLink className="w-4 h-4 ml-2" />
        <span className="ml-1 text-xs">View</span>
      </Link>
    </div>
  );
}
