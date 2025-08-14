type User = {
  email: string;
  name?: string | null;
};

export function displayName(user: User): string {
  return user.name && !!user.name.length
    ? user.name
    : user.email
        .split("@")[0]
        .replaceAll(".", " ")
        .replaceAll("+", " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}
