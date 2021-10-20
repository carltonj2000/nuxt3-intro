import type { IncomingMessage, ServerResponse } from "http";
import * as url from "url";

export default async (req: IncomingMessage, res: ServerResponse) => {
  const query = url.parse(req.url as string, true).query;
  let data = { data: [{ data: "" }] };
  const { search } = query;
  if (search) {
    data = await $fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: data }));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Bad Request" }));
  }
};
