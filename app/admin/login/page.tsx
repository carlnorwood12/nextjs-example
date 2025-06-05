"use client";

  // to test the login page with admin cred, you can use the following credentials: 
  // drbubblesgradedunit@gmail.com and password: Password!A

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => 
{
    event.preventDefault();
    setError(null);
    // From documentation supabase
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // if theres an error output
    if (signInError) {
      setError(signInError.message);
      console.error("Login error:", signInError);
      return;
    }
    // if theres no error, check if the user is an admin
    if (signInData.user) 
    {
      const user = signInData.user;
      const { data: profileData } = await supabase
        .from('user')
        .select('role')
        .eq('id', user.id)
        .single();
      if (profileData && profileData.role === 'admin') {
        router.push("/admin");
        router.refresh();
      } 
      else 
      {
        setError("Sorry, you do not have admin access.");
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
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
            Sign In
          </Button>
        </Form>
        <p className="text-small text-center text-gray-500">
          Need an account?{" "}
          <Link href="/admin/registration" size="sm">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}