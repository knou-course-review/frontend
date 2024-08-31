export const getCookieValue = (targetKey: string) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=").map((str) => str.trim());
    if (key === targetKey) {
      return value;
    }
  }
  return null;
};
