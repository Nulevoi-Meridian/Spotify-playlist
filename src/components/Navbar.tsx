import { Logo } from "./icons/Logo";

export const Navbar = () => {
  return (
    <header className="border-b border-border-color bg-background-100 sticky top-0 z-50">
      <nav className="">
        <div className="container mx-auto flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7">
                <Logo />
              </div>
              <span className="font-bold text-sm">AudioSync</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 flex items-center gap-2">
              <span className="text-secondary font-semibold">⚡</span>
              <span className="text-sm font-bold">150</span>
              <span className="text-xs text-muted-foreground">credits</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
