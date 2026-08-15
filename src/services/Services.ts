import axios from "axios";

// import type { FetchResponse } from "../types/types";

import type { Item } from "../types/types";

interface FetchResponse {
  notes: Item[];
  totalPages: number;
}

const apiBaseUrl = import.meta.env.VITE_NOTEHUB_BASE_URL;
const apiToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchItems(
  query?: string,
  currentPage?: number,
): Promise<FetchResponse> {
  console.log("fetchItems called", currentPage);
  const response = await axios.get<FetchResponse>(`${apiBaseUrl}/notes`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    params: {
      query,
      page: currentPage,
    },
  });
  // console.log(currentPage);
  // console.log(response.data);
  // console.log(response);
  // console.log(response.data);
  return response.data;
}

export async function createItem() {
  console.log("createItem called");
}

export async function deleteItem() {
  console.log("deleteItem called");
}
