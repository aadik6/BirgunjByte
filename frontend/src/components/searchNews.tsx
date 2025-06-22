import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

const SearchNews = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={"outline"}
        className="relative justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Search className="h-4 w-4" />
        खोज्नुहोस
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>IPL 2025</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchNews;
