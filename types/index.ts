export type DappsProps = {
  id: number;
  name: string;
  voteCount: number;
};

export type FilteredDappsProps = Omit<DappsProps, "voteCount"> & {
  url: string;
  logo: string;
};
