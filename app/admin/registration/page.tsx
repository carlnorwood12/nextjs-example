"use client";

import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AuthError } from "@supabase/supabase-js";

export default function RegistrationPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // handleSubmit function to handle the registration process
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const { data: signUpResponse, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    // if there are any errors during sign up, handle them
    if (signUpError) {
      console.error("Registration error:", signUpError);
      if (signUpError instanceof AuthError) {
        if (signUpError.message.includes("User already registered")) {
          setError("This email address is already registered. Please try logging in or use a different email.");
        } else if (signUpError.message.includes("Password should be at least 6 characters")) {
          setError("Password is too short. It should be at least 6 characters long.");
        } else if (signUpError.status === 429) {
          setError("Too many attempts. Please try again later.");
        } else {
          setError(signUpError.message); // Default Supabase error message
        }
      } else {
        setError("An unexpected error occurred. Please try again."); // else fallback error message
      }
      return;
    }
    // If signUpResponse contains user data or session, set the appropriate message
    if (signUpResponse.user) {
        setMessage("Success! Please check your email to confirm your account.");
    }
    else
    {
        setError("Something went wrong during registration. Please try again.");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-lg p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-xl font-medium">Create an Account</h2>
      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">{error}</p>}
        {message && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">{message}</p>}
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row w-full">
            <Input isRequired label="First Name" name="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full" />
            <Input isRequired label="Last Name" name="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full" />
          </div>
          <Input isRequired label="Email" name="email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Create a password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" type="submit">
            <p>Create Account</p>
          </Button>
        </Form>
        <p className="text-center text-sm text-gray-500 ">
          Already have an account?{" "}
          <Link href="/admin/login" size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
