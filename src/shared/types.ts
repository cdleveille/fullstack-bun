import type { api } from "@/server/helpers/api";

export type TConfig = {
  PORT: number;
};

export type TApi = typeof api;

export type TAppContext = {
  count: number;
  setCount: TReactStateSetter<number>;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type THandler<TSend, TReceive> = {
  subscribe: () => {
    send: (sendData: TSend) => void;
    on: (
      event: "message",
      callback: (receiveData: { data: TReceive; isTrusted: boolean }) => void,
    ) => void;
    close: () => void;
  };
};
