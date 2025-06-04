// carlnorwood12/nextjs-example/nextjs-example-fb5b97f414ef93be4eacec71d4f06541945c96d9/app/admin/registration/page.tsx
"use client";

import { Button, Form, Input, Link } from "@heroui/react";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

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

    if (signUpError) {
      setError(signUpError.message);
      console.error("Registration error:", signUpError);
      return;
    }

    const user = signUpResponse.user;

    if (user) {
      const fullName = `${firstName} ${lastName}`.trim();
      const { error: profileInsertError } = await supabase
        .from('profiles') // YOUR CUSTOM TABLE NAME HERE
        .insert({
          id: user.id,      
          name: fullName,
          email: user.email,
          role: 'admin'    
        });

      if (profileInsertError) {
        setError(
          `User registered in Auth, but failed to create profile with admin role: ${profileInsertError.message}. Please contact support.`
        );
        console.error("Profile insert error:", profileInsertError);
        // Note: The user exists in auth.users, but their profile/role setup failed.
        // You might need a cleanup mechanism or manual intervention for such cases.
      } else {
        // Profile created successfully
        if (user.identities && user.identities.length > 0 && !user.email_confirmed_at) {
          setMessage(
            "Registration successful! Admin profile created. Please check your email to confirm your account."
          );
        } else {
          setMessage("Registration successful! Admin profile created. You can now log in.");
        }
      }
    } else {
      if (signUpResponse.session && !signUpResponse.user) {
          setMessage("Confirmation email resent. Please check your email. If already confirmed, try logging in.");
      } else {
        setError("Registration did not complete fully. User data for profile creation was not available. Please try again or contact support.");
        console.warn("Registration: signUpResponse.user was null, but no signUpError. Response:", signUpResponse);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-lg p-6">
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