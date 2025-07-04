import { getUsers } from "@/apis/user";
import { userData } from "@/types/userTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<userData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers();
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching users");
      }
    };
    fetchUsers();
  }, []);

  const columns = (): ColumnDef<userData>[] => [
    {
        header: "S.No.",
      cell: ({ row }) => {
        return <div className="text-left font-medium">{row.index + 1}</div>;
      },
    },
    {
      header: "Name",
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        return `${firstName} ${lastName}`;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }
  return (
    <div className="container">
      <Button
        onClick={() => {navigate("/admin/adduser")}}
        className="cursor-pointer bg-purple-600 hover:bg-purple-800 dark:text-white"
      >
        Add User
      </Button>
      <DataTable data={users} columns={columns()} />
    </div>
  );
};

export default Users;
