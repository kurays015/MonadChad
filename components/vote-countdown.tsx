"use client";

import { contractAddress } from "@/lib/contract-address";
import { votingAbi } from "@/lib/votingAbi";
import { useEffect, useState, useMemo } from "react";
import { useReadContract } from "wagmi";

export default function VoteCountdown() {
  // Fetch the next reset timestamp from the contract
  const {
    data: nextResetTimestamp,
    isLoading,
    error,
  } = useReadContract({
    address: contractAddress,
    abi: votingAbi,
    functionName: "getNextResetTimestamp",
  });

  const [secondsUntilReset, setSecondsUntilReset] = useState<number>(0);

  useEffect(() => {
    if (!nextResetTimestamp) return;

    let targetMs = Number(nextResetTimestamp) * 1000; // Convert to milliseconds

    // Debug logs
    console.log(
      "nextResetTimestamp:",
      Number(nextResetTimestamp),
      new Date(targetMs)
    );
    console.log("Current time:", Date.now(), new Date(Date.now()));

    const updateCountdown = () => {
      const nowMs = Date.now();
      let secondsLeft = Math.max(0, Math.floor((targetMs - nowMs) / 1000));

      if (secondsLeft <= 0) {
        // Reset has occurred; since nextResetTimestamp updates via useReadContract,
        // the useEffect will retrigger with the new timestamp
        targetMs += 24 * 60 * 60 * 1000; // Add 24 hours as a fallback
        secondsLeft = Math.max(0, Math.floor((targetMs - nowMs) / 1000));
        console.log("Reset occurred, new target:", new Date(targetMs));
      }

      setSecondsUntilReset(secondsLeft);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextResetTimestamp]);

  // Memoize countdown parts to avoid recalculating on every render
  const countdown = useMemo(() => {
    let diffSeconds = secondsUntilReset;
    const hours = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    const minutes = Math.floor(diffSeconds / 60);
    const seconds = diffSeconds % 60;
    return { hours, minutes, seconds };
  }, [secondsUntilReset]);

  // Determine reset time in PHT (UTC+8) based on nextResetTimestamp
  const resetTimeDisplay = nextResetTimestamp
    ? (() => {
        const resetDate = new Date(Number(nextResetTimestamp) * 1000);
        const hoursPHT = (resetDate.getUTCHours() + 8) % 24;
        return `${hoursPHT.toString().padStart(2, "0")}:00 ${
          hoursPHT >= 12 ? "PM" : "AM"
        } UTC`;
      })()
    : "Loading...";

  if (isLoading)
    return (
      <div className="text-gray-400 text-sm my-4">Loading countdown...</div>
    );
  if (error)
    return (
      <div className="text-gray-400 text-sm my-4">Error: {error.message}</div>
    );

  return (
    <div className="text-gray-400 text-sm my-4">
      Vote reset in:{" "}
      <span className="tabular-nums">
        {String(countdown.hours).padStart(2, "0")}:
        {String(countdown.minutes).padStart(2, "0")}:
        {String(countdown.seconds).padStart(2, "0")}
      </span>{" "}
      ({resetTimeDisplay})
    </div>
  );
}
