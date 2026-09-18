import { Toaster } from "sonner";

export default function SonnerToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
        },
      }}
    />
  );
}