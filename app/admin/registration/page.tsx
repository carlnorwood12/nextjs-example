// carlnorwood12/nextjs-example/nextjs-example-c7dd447be2ff71ecb1b827933cb522f7b13516bb/app/admin/registration/page.tsx
"use client"; // Keep this for client-side interactions

import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import { useRouter } from "next/navigation"; // For redirection

export default function RegistrationPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      console.error("Registration error:", signUpError);
    } else if (data.user) {
      // Check if the user object exists and if email confirmation is required
      if (data.user.identities && data.user.identities.length > 0 && !data.user.email_confirmed_at) {
        setMessage(
          "Registration successful! Please check your email to confirm your account."
        );
      } else {
        setMessage("Registration successful! You can now log in.");
      }
      // Optionally redirect to login or a specific page
      // router.push('/admin/login');
    } else {
       setError("An unexpected error occurred during registration.");
    }
  };

  return (
    <div className="bg-default-50 flex min-h-screen items-center justify-center p-4">
      <div className="bg-content1 flex w-full max-w-md flex-col gap-4 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-medium">Create an Admin Account</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-500">{message}</p>}
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              isRequired
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              variant="bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              isRequired
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              variant="bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
            placeholder="Create a password (min. 6 characters)"
            type="password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="w-full" color="primary" type="submit">
            Create Account
          </Button>
        </Form>
        <p className="text-small text-center">
          Already have an account?{" "}
          <Link href="/admin/login" size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}