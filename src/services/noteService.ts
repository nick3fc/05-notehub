import axios from "axios";

// import type { FetchResponse } from "../types/types";

import type { Item } from "../types/types";

interface FetchResponse {
  notes: Item[];
  totalPages: number;
}
interface formValuesProps {
  content: string;
  tag: string;
  title: string;
}

const apiBaseUrl = import.meta.env.VITE_NOTEHUB_BASE_URL;
const apiToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchItems(
  query?: string,
  currentPage?: number,
): Promise<FetchResponse> {
  // console.log("fetchItems called", currentPage);
  const response = await axios.get<FetchResponse>(`${apiBaseUrl}/notes`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    params: {
      query,
      page: currentPage,
    },
  });

  return response.data;
}

export async function createItem(formValues: formValuesProps) {
  // console.log("createItem formValues", formValues);
  const response = await axios.post(`${apiBaseUrl}/notes`, formValues, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  // console.log("response values", response.data);
  return response.data;
}

export async function deleteItem(deleteID: string) {
  console.log("deleteItem called", deleteID);
  const response = await axios.delete(`${apiBaseUrl}/notes/${deleteID}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return response.data;
}
