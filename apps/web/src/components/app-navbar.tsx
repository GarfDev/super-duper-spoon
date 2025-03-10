import { cn } from "~/lib/utils";
import { SidebarTrigger } from "./ui/sidebar";
import { FilePlus2 } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const NAV_HEIGHT = 64;

interface Props {
  className?: string;
}

const AppNavbar = ({ className }: Props) => {
  return (
    <nav
      className={cn(
        className,
        "w-full px-2 py-2 flex items-center gap-4 justify-between",
        `h-[${NAV_HEIGHT}px]`,
      )}
    >
      <div className="flex flex-nowrap justify-start">
        <SidebarTrigger className="text-2xl" />
        <Button className={cn("h-9 w-9", className)} variant="ghost">
          <FilePlus2 className="scale-125" />
        </Button>
      </div>

      <div className="flex flex-nowrap justify-end">
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default AppNavbar;
