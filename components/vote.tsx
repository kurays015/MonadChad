import VotingSectionHeader from "./voting-section-header";
import AddDapp from "./add-dapp";
import Pagination from "./pagination";
import SeachBar from "./search-bar";
import ConfirmationDialog from "./confirmation-dialog";
import RankingsCard from "./rankings-card";
import DappsGrid from "./dapps-grid";

export default function Vote() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <AddDapp />
          <div className="space-y-4 relative">
            <VotingSectionHeader />
            <SeachBar />
            <DappsGrid />
            <Pagination />
          </div>
        </div>
        <div className="lg:w-80 space-y-6">
          <RankingsCard />
        </div>
      </div>
      <ConfirmationDialog />
    </div>
  );
}
