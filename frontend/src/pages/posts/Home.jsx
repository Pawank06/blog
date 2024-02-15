import Posts from "@/components/ui/Posts";
import { PostContext } from "@/context/PostContext";
import { getPosts } from "@/controllers/posts.controller";
import { Loader } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  // use context to get posts
  const { posts, setPosts } = useContext(PostContext);

  // Loading all posts
  const [loading, setLoading] = useState(true);

  // get all posts
  useEffect(() => {
    setTimeout(async () => {
      const data = await getPosts();
      setPosts(data.posts);
      setLoading(false);
    }, 500);
  }, []);

  const handleClick = (id) => {
    navigate(`/post/${id}`)
  }


  return (
    <div className="mt-20 mb-20" >
    <div className="flex items-center justify-center mb-10">
        {loading && (
        <Loader className="mr-2 h- w-6 animate-spin" />
    )}
    </div>

    <div className="grid grid-cols-2 gap-4">
    {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <Posts post={post} handleClick = {handleClick} />
          </div>
        ))}
    </div>
      
    </div>
  );
};

export default HomePage;
