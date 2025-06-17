import { Link } from "@tanstack/react-router";

import { AppInfo } from "@/shared/constants";

export const About = () => {
  return (
    <main>
      <h1>fullstack-bun</h1>
      <p>
        Single-page web app project template curated for performance, developer experience, and type
        safety. Bun & Elysia backend, React & TanStack Router/Query frontend.
      </p>
      <p>
        Created by <Link to={AppInfo.author.url}>{AppInfo.author.name}</Link>
      </p>
    </main>
  );
};
