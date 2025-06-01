import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="text-xs mt-24 border-t border-gray-800 bg-[#0c0c0c] py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:justify-evenly text-gray-400">
        {/* Left: Copyright */}
        <p className="">
          &copy; {new Date().getFullYear()} MonadChad. All rights reserved.
        </p>
        <p>
          For fun only! To contribute at least on{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://testnet.monadexplorer.com/ecosystem"
            className="underline"
          >
            Monad Ecosystem
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <p> Made with 🖤 by </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/intent/follow?screen_name=constkurays"
            className="flex items-center justify-center w-6 h-6 border border-white/20 rounded-full transition-all duration-350 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb; shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)] hover:border-[#6E54FF] hover:shadow-[0_0_8px_#6E54FF,0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08)]"
          >
            <FaXTwitter className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
