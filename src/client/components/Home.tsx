import { getRouteApi } from "@tanstack/react-router";

import BunLogo from "@/client/assets/bun.svg";
import { useApi } from "@/client/hooks/useApi";
import { useApp } from "@/client/hooks/useApp";

export const Home = () => {
  const { count, minusCount, plusCount } = useApp();

  const { useWsHello, useGetHello, usePostHello } = useApi();

  const { sendMessage: wsHello } = useWsHello();

  const { mutate: getHello } = useGetHello();
  const { mutate: postHello } = usePostHello("from bun");

  const home = getRouteApi("/");
  const { message } = home.useLoaderData();

  return (
    <main>
      <h1>{message}</h1>
      <BunLogo width={250} height={225} />
      <div className="row" style={{ scale: 1.5 }}>
        <button type="button" onClick={minusCount}>
          -
        </button>
        <div className="count">{count}</div>
        <button type="button" onClick={plusCount}>
          +
        </button>
      </div>
      <div className="row gap">
        <button type="button" onClick={() => getHello()}>
          GET
        </button>
        <button type="button" onClick={() => postHello()}>
          POST
        </button>
        <button type="button" onClick={() => wsHello({ message: "ws: hello from client!" })}>
          WS
        </button>
      </div>
    </main>
  );
};
