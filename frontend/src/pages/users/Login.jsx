import { Alertmsg } from "@/components/ui/Alertmsg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserContext";
import { loginUser } from "@/controllers/users.controllers";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  // User context

  const { setUser} = useContext(UserContext)

  // use navigate hook
  const navigate = useNavigate()
  
  // Error State
  const [error, setError] = useState(null);

  // Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle login
  const hanleLogin = async(e) => {
    e.preventDefault();
    try {
      // login user
      await loginUser(email, password)

      // update user state
      setUser({email, posts: []})
      // navigate to dashboard
      navigate("/dashboard")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="flex item-center justify-center">
      <Card className="w-[400px] border-none mt-[8rem]">
        <CardHeader className="items-center gap-2">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password below to see posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={hanleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="name@Example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button >Login</Button>
              </div>
            </div>
          </form>
          <div className="mt-2">{error && <Alertmsg msg={error} />}</div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </section>
  );
};

export default Login;
