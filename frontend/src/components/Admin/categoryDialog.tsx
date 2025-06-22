import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CategoryFormValue, categorySchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { createCategory, updateCategory } from "@/apis/category";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { CategoryData } from "@/types/columnTypes";

function CategoryDialog({
  mode,
  onOpen,
  onClose,
  category,
  refetched,
}: {
  mode: "add" | "update";
  onOpen: boolean;
  onClose: () => void;
  category?: CategoryData;
  refetched: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(onOpen);
  }, [onOpen]);

  const handleDialogClose = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) {
      onClose();
    }
  };

  const {handleSubmit, reset, setValue, watch } =
    useForm<CategoryFormValue>({
      resolver: zodResolver(categorySchema),
      defaultValues: category,
    });

  useEffect(() => {
    if (mode === "update" && category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [mode, category, setValue]);

  const onSubmit = async (data: CategoryFormValue) => {
    console.log(`${mode === "add" ? "Adding" : "Updating"} category:`, data);
    try {
      setProcessing(true);

      if (mode === "add") {
        const res = await createCategory(data);
        if (res.status === 201) {
          toast.success("Category created successfully");
          refetched();
        }
      } else {
        // Replace with your update API

        const res = category && await updateCategory(category?.id, data);
        if (res?.status === 200) {
          toast.success("Category updated successfully");
          refetched();
        }
      }

      reset();
      setProcessing(false);
      onClose();
    } catch (err) {
      setProcessing(false);
      console.error(err);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Category" : "Update Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Put the category name and description for further use."
              : "Update the category name and description."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => {
                  setValue("name", e.target.value);
                }}
                value={watch("name")}
                id="categoryName"
                placeholder="Enter category name.."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                 onChange={(e) => {
                  setValue("description", e.target.value);
                }}
                value={watch("description")}
                id="description"
                placeholder="Enter category details"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={processing} className="bg-purple-700 hover:bg-purple-700 text-white cursor-pointer">
              {processing ? (
                <>
                  <LoaderIcon className="animate-spin" />
                  {mode === "add" ? "Creating.." : "Updating.."}
                </>
              ) : mode === "add" ? (
                "Add Category"
              ) : (
                "Update Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryDialog;
