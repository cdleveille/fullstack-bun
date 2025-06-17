import { Config } from "@/client/helpers/config";

const accessStorage = (storage: Storage) => ({
  setItem: (key: string, data: unknown) => storage.setItem(key, JSON.stringify(data)),
  getItem: <T = unknown>(key: string) => {
    const data = storage.getItem(key);
    if (data !== null) return JSON.parse(data) as T;
    return null;
  },
  removeItem: (key: string) => storage.removeItem(key),
});

export const storage = {
  local: accessStorage(window.localStorage),
  session: accessStorage(window.sessionStorage),
};

export const assertGetElementById = (id: string) => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element with id '${id}' not found`);
  return element;
};

export const registerServiceWorker = async () => {
  if (!Config.IS_PROD || !navigator.serviceWorker) return;

  const registration = await navigator.serviceWorker.register("sw.js", {
    type: "module",
    scope: "/",
  });

  if (registration.active) await registration.update();
};
