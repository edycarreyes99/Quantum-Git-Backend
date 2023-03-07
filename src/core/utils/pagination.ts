import { IPagination } from "../interfaces/pagination";

export function parsePaginationString(paginationString: string): IPagination {
  const pagination: IPagination = {
    first: null,
    previous: null,
    next: null,
    last: null,
  };
  const paginationArray = paginationString.match(/<([^;]*)>; rel="([^;]*)"/g);

  paginationArray?.forEach((link: string) => {
    const urlParams = new URLSearchParams(link.match(/<([^;]*)>/g)?.at(0));
    const page = parseInt(urlParams.get("page") ?? "0", 10);
    if (link.includes("prev")) {
      pagination.previous = page;
    } else if (link.includes("first")) {
      pagination.first = page;
    } else if (link.includes("next")) {
      pagination.next = page;
    } else if (link.includes("last")) {
      pagination.last = page;
    }
  });

  return pagination;
}