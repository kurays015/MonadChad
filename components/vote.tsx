import VotingSectionHeader from "./voting-section-header";
import AddDapp from "./add-dapp";
import Pagination from "./pagination";
import SeachBar from "./search-bar";
import ConfirmationDialog from "./confirmation-dialog";
import RankingsCard from "./rankings-card";
import DappsGrid from "./dapps-grid";

export default function Vote() {
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <AddDapp />
          <div className="space-y-4">
            <VotingSectionHeader />
            <SeachBar />
            <DappsGrid />
            <Pagination />
          </div>
        </div>
        <div className="lg:w-80 space-y-6">
          <RankingsCard />
          {/* {receiptError && (
              <Card className="bg-[#1A1D21] border-red-500 shadow-[0px_1px_1px_0px_rgba(255,255,255,0.12)_inset,0px_1px_2px_0px_rgba(0,0,0,0.08),0px_0px_0px_1px_#000]">
                <CardContent className="pt-4">
                  <p className="text-red-600 text-sm">
                    Transaction Error: {receiptError.message}
                  </p>
                </CardContent>
              </Card>
            )} */}
        </div>
      </div>
      <ConfirmationDialog />
    </div>
  );
}
