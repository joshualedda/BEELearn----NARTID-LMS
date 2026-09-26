"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function LocalDateTime({ value }: { value: string }) {
  const label = useSyncExternalStore(
    subscribe,
    () => new Date(value).toLocaleString(),
    () => `${new Date(value).toLocaleString("en-US", { timeZone: "UTC" })} UTC`,
  );
  return <time dateTime={value}>{label}</time>;
}
