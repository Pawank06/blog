/* eslint-disable react/prop-types */
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const Posts = ({ post, children, handleClick }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg lg:text-xl">{post.title}</CardTitle>
          <CardDescription>created at {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 lg:line-clamp-4">{post.body}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={ () => handleClick(post._id)}>Read More</Button>
          <>{children}</>
        </CardFooter>
      </Card>
    </>
  );
};

export default Posts;
