import { Alertmsg } from "@/components/ui/Alertmsg";
import Posts from "@/components/ui/Posts";
import { Successmsg } from "@/components/ui/Successmsg";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { deletePost, getUserPosts } from "@/controllers/posts.controller";
import { Edit, Loader, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //use userContext to get user posts
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const { userPosts, email } = await getUserPosts();

      setUser({ email, posts: userPosts });

      setLoading(false);
    }, 500);
  }, []);

  // Handle delete post

  const handleDelete = async (_id) => {
    if (confirm("Confirm Delete?")) {
      try {
        const data = await deletePost(_id);
        setSuccess(data.message);
      } catch (error) {
        setError(error.message);
      }
      const newPosts = user.posts.filter((post) => post._id != _id);
      setUser({ ...user, posts: newPosts });
    }
  };

  return (
    <div className="mt-20 ">
      <div className="flex items-center justify-center">
        {loading && <Loader className="mr-2 h- w-6 animate-spin dark:text-white" />}
      </div>
      {success && <Successmsg msg={success} />}
      {error && <Alertmsg msg={error} />}

      <div className="grid lg:grid-cols-2 gap-8">
        {user.posts &&
          user.posts.map((post) => (
            <div key={post._id}>
              <Posts post={post}>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    title="Delete"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Trash2
                      width={20}
                      height={20}
                      className="hover:text-red-700 "
                    />
                  </Button>

                  <Link title="Update" to="/update" state={post}>
                    <Button variant="outline">
                      <Edit
                        width={20}
                        height={20}
                        className="hover:text-blue-700"
                      />
                    </Button>
                  </Link>
                </div>
              </Posts>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
