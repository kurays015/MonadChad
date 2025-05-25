import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
            className="bg-[#6E54FF] text-white hover:bg-[#836EF9] rounded-[100px]"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <p className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            className="bg-[#6E54FF] text-white hover:bg-[#836EF9] rounded-[100px]"
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </>
  );
}
