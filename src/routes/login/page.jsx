import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFormInput from "@/useFormInput";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/config";
import { Link, redirect, useNavigate } from "react-router-dom";
import { setUserSession } from "@/utils";

export function Login() {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    if (username.value == "" || password.value == "") {
      setError("Invalid credentials, please try again");
      setLoading(false);
    } else {
      axios
        .post(BASE_URL + "/api/auth/login", {
          email: username.value,
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
          setError("Invalid credentials, please try again");
        });
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...username}
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
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
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
