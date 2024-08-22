import { Suspense } from "react";
import { AuthContextProvider } from "./auth/AuthContextProvider";
import { DraftContextProvider } from "./draft/DraftContextProvider";
import TanstackQueryProvider from "./tanstack/TanstackQueryProvider";
import { TerminationContextProvider } from "./termination/TerminationContextProvider";
import ThemeContextProvider from "./theme/ThemeContextProvider";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <TanstackQueryProvider>
        <TerminationContextProvider>
          <Suspense>
            <AuthContextProvider>
              <DraftContextProvider>{children}</DraftContextProvider>
            </AuthContextProvider>
          </Suspense>
        </TerminationContextProvider>
      </TanstackQueryProvider>
    </ThemeContextProvider>
  );
}
