import clsx from "clsx";
import { ThemeStore } from "./globals/stores";
import Layout from "./components/layout.tsx";
import { RootRoute } from "./routes/root.routes.tsx";

function App() {
  const { theme } = ThemeStore.store();

  return (
    <>
      <Layout
        className={clsx(
          theme,
          "bg-background text-foreground",
          "w-[100vw] h-[100vh]",
        )}
      >
        <RootRoute />
      </Layout>
    </>
  );
}

export default App;
