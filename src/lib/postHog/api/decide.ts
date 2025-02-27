import { env } from "@lib/env/server";

export const decide = async (distinct_id?: string, group_id?: string) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const payload = {
    api_key: env.POSTHOG_KEY,
    distinct_id: distinct_id ?? "",
    groups: group_id
      ? {
          group_type: group_id,
        }
      : null,
  };

  const response = await fetch(env.POSTHOG_API_URL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  return response.json();
};
