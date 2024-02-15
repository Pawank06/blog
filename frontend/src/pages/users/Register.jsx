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
import { registerUser } from "@/controllers/users.controllers";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Use User context
  const {setUser} = useContext(UserContext)

  // navigate hook
  const navigate = useNavigate()

  // Error State
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle login
  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // register user
      await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword)

      // update user state
      setUser({email: formData.email, posts: []})

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
          <CardTitle>Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your username, email and password below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="name@Example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button>Register</Button>
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

export default Register;
