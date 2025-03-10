import { Button } from "~/components/ui/button";
import { ThemeStore } from "~/globals/stores";

const Homepage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">If you see this means this work</h1>
      <Button size="lg" onClick={ThemeStore.toggle}>Toggle</Button>
    </div>
  );
};

export default Homepage;
