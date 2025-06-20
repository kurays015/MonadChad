export type DappGridCardProps = {
  id: number | undefined;
  name: string;
  voteCount: number;
  url: string | undefined;
  logo: string | undefined;
};

export type VoteInfo = {
  count: bigint;
  lastResetDay: bigint;
  totalVotes: bigint;
};

export type DApp = {
  id: number;
  name: string;
  voteCount: bigint;
};
