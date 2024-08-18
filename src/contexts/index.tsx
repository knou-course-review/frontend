import { AuthContextProvider } from "./auth/AuthContextProvider";
import { DraftContextProvider } from "./draft/DraftContextProvider";
import TanstackQueryProvider from "./tanstack/TanstackQueryProvider";
import ThemeContextProvider from "./theme/ThemeContextProvider";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <TanstackQueryProvider>
        <AuthContextProvider>
        <DraftContextProvider>{children}</DraftContextProvider>
        </AuthContextProvider>
      </TanstackQueryProvider>
    </ThemeContextProvider>
  );
}
