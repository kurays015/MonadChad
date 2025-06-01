import Image from "next/image";
import CustomConnectWallet from "@/components/custom-connect-wallet";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <Image
          src="https://cdn.prod.website-files.com/667c57e6f9254a4b6d914440/667d7104644c621965495f6e_LogoMark.svg"
          alt="MonadChad logo"
          width={40}
          height={40}
        />
        <h1 className="customSm:text-sm lg:text-2xl font-bold bg-gradient-to-b from-white to-gray-600 text-transparent bg-clip-text transition-all duration-350 ease-&lsqb;cubic-bezier(0.34,1.56,0.64,1)&rsqb; hover:text-shadow-[0_0_8px_#6E54FF]">
          MonadChad
        </h1>{" "}
      </div>
      <CustomConnectWallet />
    </div>
  );
}
