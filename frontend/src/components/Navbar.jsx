import { UserContext } from "@/context/UserContext";
import  { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { PlusCircle, UserCheck2 } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    if (confirm("Confirm LogOut?")) {
      setUser({ email: null, posts: [] });
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <nav className="py-6 flex items-center gap-2 justify-between">
      <Link to="/">
        <h1 className="dark:text-white font-semibold text-2xl">Blogify</h1>
      </Link>

      <div>
        <ModeToggle />
      </div>

      {user.email ? (
        <div className="flex items-center gap-3 ">
          <Link to="/create">
            <Button title="Create" className="text-md gap-2">
              <PlusCircle />
            </Button>
          </Link>
          <Link
            to="/dashboard"
            className="border dark:border-white dark:text-white dark:hover:bg-accent dark:hover:text-accent-foreground p-3 rounded-full "
          >
            <div>
              <UserCheck2 className=" dark:text-white" />
            </div>
          </Link>

          <Button onClick={() => handleLogout()} variant="outline">
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 ">
          <Link to="/login">
            <Button className="text-md" variant="outline">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
