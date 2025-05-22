import { deleteNews, getAllNews } from "@/apis/news";
import { newsData } from "@/types/newsTypes";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "../dataTable";
import parse from "html-react-parser";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Loader, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import DeleteDialog from "../ui/deleteDialog";


const ManageNews = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<newsData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await getAllNews();
      console.log(res.data.news, "data");
      setData(res.data.news);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const newsColumns = (): ColumnDef<newsData>[] => [
    {
      accessorKey: "S.No.",
      header: () => <div className="text-left">S.No.</div>,
      cell: ({ row }) => {
        return <div className="text-left font-medium">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "Heading",
      cell: ({ row }) => {
        return (
          <div className="w-40 truncate overflow-hidden text-ellipsis font-sans">
            {parse(row.original.heading)}
          </div>
        );
      },
    },
    {
      accessorKey: "category.name",
      header: "Category",
    },
    {
      accessorKey: "npDate",
      cell: ({ row }) => {
        const date = row.original.npDate?.split("T")[0];
        return <div>{date}</div>;
      },
      enableGlobalFilter: true,
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "views",
      header: "View",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const news = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none">
              <Button variant="ghost" className="h-8 w-8 p-0 border-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(news.id)}
              >
                Copy news ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log(row.original.id);
                }}
              >
                Edit news
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleDelete(row.original.id);
                }}
              >
                Delete news
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [newsId, setNewsId] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDelete = (id: string) => {
    setNewsId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteNews(newsId);
      if (res.status === 200) {
        setDeleteDialogOpen(false);
        setNewsId("");
        toast.success("Category deleted successfully!");
        fetchNews();
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
    setNewsId("");
  };
if(loading) {
  return (
    <div className="flex items-center justify-center h-[90vh]">
    <Loader className="animate-spin" size={24} />
  </div>
  )
}
  return (
    <div>
      <Button
        // variant={"outline"}
        onClick={() => navigate("/admin/addNews")}
        className="cursor-pointer bg-purple-600 hover:bg-purple-800 dark:text-white"
      >
        Add News
      </Button>
      <DataTable data={data} columns={newsColumns()} />
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        name="News"
      />
    </div>
  );
};

export default ManageNews;
