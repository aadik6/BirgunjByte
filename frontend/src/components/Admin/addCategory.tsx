import { deleteCategory } from "@/apis/category";
import { useEffect, useState } from "react";
import { DataTable } from "../dataTable";
import { Button } from "../ui/button";
import { CategoryData } from "@/types/columnTypes";
import DeleteDialog from "../ui/deleteDialog";
import { toast } from "sonner";
import CategoryDialog from "./categoryDialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash, View } from "lucide-react";
import useCategoryStore from "@/stores/useCategoryStore";

const Category = () => {
  const [addCategoryDialog, setAddCategoryDialog] = useState<boolean>(false);
  const [editCategoryDialog, setEditCategoryDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<CategoryData>({
    id: "",
    name: "",
    description: "",
  });
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {categories,fetchCategories,loading} = useCategoryStore();

  const categoryColumn = (): ColumnDef<CategoryData>[] => [
    {
      accessorKey: "S.No.",
      header: () => <div className="text-left">S.No.</div>,
      cell: ({ row }) => {
        return <div className="text-left font-medium">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="ml-[-10px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <>
            {/* View Button */}
            <Button
              variant={"ghost"}
              onClick={() => {
                console.log("Viewing category:", row.original.id);
              }}
              className="text-blue-600 cursor-pointer hover:text-blue-700"
            >
              <View className="h-4 w-4" />
            </Button>

            {/* Edit Button */}
            <Button
              variant={"ghost"}
              onClick={() => {
                handleEdit(row.original);
              }}
              className="text-green-600 cursor-pointer hover:text-green-700"
            >
              <Edit className="h-4 w-4" />
            </Button>

            {/* Delete Button */}
            <Button
              variant={"ghost"}
              onClick={() => handleDelete(row.original)}
              className="text-red-600 cursor-pointer hover:text-red-700"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        );
      },
    },
  ];

  const handleEdit = (row: CategoryData) => {
    setSelectedRow(row);
    setEditCategoryDialog(true);
  };

  const handleDelete = (row: CategoryData) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteCategory(selectedRow.id);
      if (res.status === 200) {
        setDeleteDialogOpen(false);
        setSelectedRow({
          id: "",
          name: "",
          description: "",
        });
        toast.success("Category deleted successfully!");
        fetchCategories();
      } else {
        throw new Error("status is not 200");
      }
    } catch (err) {
      console.log("category deleting error", err);
      toast.error("Something went wrong please try again");
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedRow({
      id: "",
      name: "",
      description: "",
    });
  };


  useEffect(() => {
    fetchCategories();
  }, []);
  if(loading){
    return <div>Loading.....</div>
  }

  return (
    <div>
      <Button
        onClick={() => setAddCategoryDialog(true)}
        className="cursor-pointer bg-purple-600 hover:bg-purple-800 dark:text-white"
      >
        Add Category
      </Button>
      <DataTable data={categories} columns={categoryColumn()} />
      <CategoryDialog
        mode="add"
        onOpen={addCategoryDialog}
        onClose={() => setAddCategoryDialog(false)}
        refetched={fetchCategories}
      />
      <CategoryDialog
        mode="update"
        onOpen={editCategoryDialog}
        onClose={() => setEditCategoryDialog(false)}
        category={selectedRow} // Pass the selected category for update
        refetched={fetchCategories}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        name="Category"
      />
    </div>
  );
};

export default Category;
