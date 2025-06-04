// carlnorwood12/nextjs-example/nextjs-example-c7dd447be2ff71ecb1b827933cb522f7b13516bb/app/admin/login/page.tsx
"use client"; // Keep this for client-side interactions

import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import { useRouter } from "next/navigation"; // For redirection

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      console.error("Login error:", signInError);
    } else {
      // On successful login, Supabase handles the session.
      // The middleware will manage redirection to protected routes.
      // We might want to refresh the page or navigate to ensure middleware kicks in
      // or to trigger a state update in a layout component.
      router.push("/admin"); // Redirect to the main admin page or dashboard
      router.refresh(); // Important to re-evaluate routes and middleware
    }
  };

  return (
    <div className="bg-default-50 flex min-h-screen items-center justify-center p-4">
      <div className="bg-content1 flex w-full max-w-sm flex-col gap-4 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-medium">Welcome Back, Admin</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
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