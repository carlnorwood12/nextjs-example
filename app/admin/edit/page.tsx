import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Edit() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // it redirects to /admin/login
  if (!session) {
    return redirect('/admin/login');
  }

  // Fetch user profile including role that i included in the database 
  const { data: userProfile, error } = await supabase
    .from('user')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (error || !userProfile) {
    // Redirect to home if there's an error or the user profile isn't found.
    return redirect('/');
  }

  if (userProfile.role !== 'admin') {
    // Redirect non-admin users to the home page.
    return redirect('/');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-3xl font-bold">Edit</h1>
        <p>This is the protected edit page for admins.</p>
      </div>
    </div>
  );
}