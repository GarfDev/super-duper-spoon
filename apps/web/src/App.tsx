import clsx from "clsx";
import { ThemeStore } from "./globals/stores";
import PWABadge from "./PWABadge.tsx";
import { Button } from "~/components/ui/button.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

function App() {
  const { theme } = ThemeStore.store();

  return (
    <>
      <div
        className={clsx(
          theme,
          "bg-background text-foreground",
          "w-[100vw] h-[100vh] flex justify-center items-center",
        )}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">If you see this means this work</h1>
          <Button onClick={ThemeStore.toggle}>Toggle</Button>
        </div>
      </div>

      <Toaster />
      <PWABadge />
    </>
  );
}

export default App;
