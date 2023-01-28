import { MUTATE_END_POINT } from "./constants";

export const fetchSanity = async (mutations: any) => {
  const result = await fetch(MUTATE_END_POINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
  });
  return result;
};
