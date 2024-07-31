import { useEffect, useState } from "react";

export default function useSession() {
  const [session, setSession] = useState<{ isLoggedIn: boolean } | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch("/api/check-session");
      const data = await response.json();
      setSession(data);
    }

    fetchSession();
  }, []);

  return { session, setSession };
}
