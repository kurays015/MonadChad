if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS === undefined) {
  throw new Error(
    "NEXT_PUBLIC_CONTRACT_ADDRESS is not defined in environment variables"
  );
}

export const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
