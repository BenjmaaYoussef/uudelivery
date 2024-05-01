import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormInput from "@/useFormInput";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/config";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setUserSession } from "@/utils";
export function SignUp() {
  const [loading, setLoading] = useState(false);
  const email = useFormInput("");
  const username = useFormInput("");
  const password = useFormInput("");
  const surname = useFormInput("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(BASE_URL + "/api/auth/registration", {
        email: email.value,
        name: username.value,
        surname: surname.value,
        role: role,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.accessToken, response.data.user);
        console.log("to dashboard");
        navigate(`/`, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create an account
            </p>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
                <br />
              </>
            )}
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                required
                {...username}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Surname</Label>
              <Input
                id="surname"
                type="text"
                placeholder=""
                required
                {...surname}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input id="password" type="password" required {...password} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="role">Role</Label>
              </div>
              <Select onValueChange={(val) => setRole(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="DeliveryMan">Delivery Man</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/login.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
