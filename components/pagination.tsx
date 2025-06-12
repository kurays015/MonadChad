"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { usePageStore } from "@/store/page-store";
import { data } from "@/lib/data";

export default function Pagination() {
  const currentPage = usePageStore(state => state.currentPage);
  const setCurrentPage = usePageStore(state => state.setCurrentPage);
  const totalPages = Math.ceil(data.length / 12);

  return (
    <>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
            className="bg-[#6E54FF] text-white hover:bg-[#836EF9] rounded-[100px]"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <p className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            className="bg-[#6E54FF] text-white hover:bg-[#836EF9] rounded-[100px]"
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
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
