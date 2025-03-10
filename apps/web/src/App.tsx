import clsx from "clsx";
import Layout from "./components/layout.tsx";
import { RootRoute } from "./routes/root.routes.tsx";
import { PreferenceStore } from "./globals/stores/index.ts";

function App() {
  const { theme } = PreferenceStore.store();

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
