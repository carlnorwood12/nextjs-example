// app/admin/page.tsx
import React from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the session exists and redirect to login if not
  if (!session) {
    return redirect("/admin/login");
  }
  // Fetch user profile including role, first_name, and last_name
  const { data: userProfile, error: profileError } = await supabase.from("user").select("role, first_name, last_name").eq("id", session.user.id).single();
  if (profileError || !userProfile) {
    console.error("Error fetching user profile or profile not found:", profileError); // output error to console
    return redirect("/"); // Redirect to home 
  }
  // Authorization: check if the user is an admin
  if (userProfile.role !== "admin") {
    return redirect("/"); // Redirect to home
  }
  // Combine first_name and last_name for display so its like welcome, Carl Norwood
  const { first_name, last_name } = userProfile;
  let displayName = ""; // Initialize with an empty string

  // Check if first_name and last_name exist and combine them
  if (first_name && last_name) {
    displayName = `${first_name} ${last_name}`;
  } else if (first_name) {
    displayName = first_name;
  } else if (last_name) {
    displayName = last_name;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="my-2">Welcome{displayName ? `, ${displayName}` : ""}!</p>
    </div>
  );
}
