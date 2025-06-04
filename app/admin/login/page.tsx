// carlnorwood12/nextjs-example/nextjs-example-c7dd447be2ff71ecb1b827933cb522f7b13516bb/app/admin/login/page.tsx
"use client";

import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      console.error("Login error:", signInError);
      return;
    }
    if (signInData.user) {
      const user = signInData.user;
      const { data: profileData, error: profileError } = await supabase
        .from('profiles') 
        .select('role')
        .eq('id', user.id) 
        .single();

      if (profileError) {
        setError("Failed to retrieve user role. Please try again.");
        console.error("Profile fetch error:", profileError);
        await supabase.auth.signOut();
        return;
      }

      if (profileData && profileData.role === 'admin') {
        router.push("/admin");
        router.refresh();
      } else {
        setError("You do not have permission to access the admin area.");
        await supabase.auth.signOut();
      }
    } else {
      setError("Login successful, but user data could not be retrieved.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg p-6">
        <h2 className="text-xl font-medium">Welcome Back, Admin</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </Form>
        <p className="text-small text-center">
          Need an account?{" "}
          <Link href="/admin/registration" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}