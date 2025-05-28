export type DappGridCardProps = {
  id: number;
  name: string;
  voteCount: number;
  url: string | undefined;
  logo: string | undefined;
};

export type VoteInfo = [bigint, number, number];
