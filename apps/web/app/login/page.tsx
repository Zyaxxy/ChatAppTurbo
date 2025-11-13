"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <Card className="w-[350px] shadow-lg border border-slate-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome Back 👋
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <Separator className="my-4" />

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
