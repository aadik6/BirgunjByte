"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown, Edit, Trash, View } from "lucide-react";
import { CategoryData } from "@/types/columnTypes";

export const categoryColumns = (handleDelete: (row: CategoryData) => void,handleEdit:(row:CategoryData)=>void): ColumnDef<CategoryData>[] => [
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
            onClick={() => {handleEdit(row.original)} }
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
