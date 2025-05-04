import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import useCategoryStore from "@/stores/useCategoryStore";
const HeaderMenu = () => {
  const { categories, fetchCategories } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex items-center gap-5">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer " />
            {/* <Button variant="outline" className="md:hidden"></Button> */}
          </SheetTrigger>
          <SheetContent className="w-1/2 text-xs sm:text-lg" side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Navigation menu</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4 px-6">
              <SheetClose asChild>
                <NavLink to="/" className=" font-semibold text-foreground">
                  होमपेज
                </NavLink>
              </SheetClose>
              {categories &&
                categories.map((category) => (
                  <SheetClose asChild key={category.id}>
                    <NavLink
                      to={`/category/${category.name}/${category.id}`}
                      className=" font-semibold text-foreground"
                    >
                      {category.name}
                    </NavLink>
                  </SheetClose>
                ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex items-center gap-5">
          {categories && categories.slice(0,6).map((category) => (
          <NavLink key={category.id}  to={`/category/${category.name}/${category.id}`} className="text-lg font-semibold text-foreground">
            {category.name}
          </NavLink>
            ))}
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
