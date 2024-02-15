import { Alertmsg } from "@/components/ui/Alertmsg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostContext } from "@/context/PostContext";
import { updatePost } from "@/controllers/posts.controller";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { posts, setPosts } = useContext(PostContext);
  const navigate = useNavigate();
  const {state} = useLocation()

 
  const [error, setError] = useState(null);

  // Form data state
  const [title, setTitle] = useState(state.title);
  const [body, setBody] = useState(state.body);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
       // create post
       const data = await updatePost(state._id, title, body);
       // update state
       setPosts([...posts, data.post]);
       // redirect to dashboard
       navigate("/dashboard");
     } catch (error) {
    setError(error.message);
    }
  };

  return (
    <div>
      <Card className="mt-10">
        <CardHeader className="grid items-center justify-center">
          <CardTitle>Update your post</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Textarea
                className="resize-none"
                placeholder="Post Content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Button>Create</Button>
            </div>
          </form>
          {error && <Alertmsg msg={error} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePage;
