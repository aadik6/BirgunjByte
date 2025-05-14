import { useAuthStore } from "@/stores/authStore";

const AdminDashboard = () => {
  const { user } = useAuthStore();
  return (
    <>
    {user ? (
      <div>
      <p>Hey {user.firstName} {user.lastName}</p>
      </div>
    ):""}
    </>
  );
};

export default AdminDashboard;
