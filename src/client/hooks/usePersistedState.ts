import { useEffect, useMemo, useState } from "react";

import { storage } from "@/client/helpers/browser";
import { STORED_STATE_PREFIX } from "@/shared/constants";
import type { TReactStateSetter } from "@/shared/types";

export const usePersistedState = <T>({
  initialValue,
  id,
  type = "session",
  isPersistDisabled = false,
}: {
  initialValue: T;
  id: string;
  type?: "session" | "local";
  isPersistDisabled?: boolean;
}): [T, TReactStateSetter<T>] => {
  const browserStorage = type === "session" ? storage.session : storage.local;

  const persistedInitialValue = useMemo(() => {
    if (isPersistDisabled) return initialValue;
    const storedValue = browserStorage.getItem<T>(`${STORED_STATE_PREFIX}:${id}`);
    return storedValue ?? initialValue;
  }, [id, browserStorage, isPersistDisabled, initialValue]);

  const [state, setState] = useState<T>(persistedInitialValue);

  useEffect(() => {
    if (isPersistDisabled) return;
    browserStorage.setItem(`${STORED_STATE_PREFIX}:${id}`, state);
  }, [id, browserStorage, isPersistDisabled, state]);

  return [state, setState];
};
