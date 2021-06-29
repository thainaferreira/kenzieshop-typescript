import { useAuth } from "../../providers/Auth";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <h1>
      Dashboard
      <button onClick={logout}>Logout</button>
    </h1>
  );
};

export default Dashboard;
