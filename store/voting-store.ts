import { create } from "zustand";

type SelectedOption = { id: number; name: string } | null;

interface VotingState {
  selectedOption: SelectedOption;
  setSelectedOption: (option: SelectedOption) => void;
  transactionError: string | null;
  setTransactionError: (err: string | null) => void;
  loadingDappId: number | null;
  setLoadingDappId: (id: number | null) => void;
}

export const useVotingStore = create<VotingState>(set => ({
  selectedOption: null,
  setSelectedOption: option => set({ selectedOption: option }),
  transactionError: null,
  setTransactionError: err => set({ transactionError: err }),
  loadingDappId: null,
  setLoadingDappId: id => set({ loadingDappId: id }),
}));