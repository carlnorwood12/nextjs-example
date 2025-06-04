import {Button, Form, Input, Link} from "@heroui/react";
import React from "react";

export default function App() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Registration submitted");
  };

  return (
    <div className="bg-default-50 flex min-h-screen items-center justify-center p-4">
      <div className="bg-content1 flex w-full max-w-md flex-col gap-4 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-medium">Create an Account</h2>
        <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              isRequired
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              variant="bordered"
            />
            <Input
              isRequired
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              variant="bordered"
            />
          </div>
          <Input
            isRequired
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Create a password"
            type="password"
            variant="bordered"
          />
          <Input
            isRequired
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
          />
          <Button className="w-full" color="primary" type="submit">
            Create Account
          </Button>
        </Form>
        <p className="text-small text-center">
          Already have an account?{" "}
          <Link href="#" size="sm">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}