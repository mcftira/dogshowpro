import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        navigate('/auth/login?error=Unable to authenticate');
        return;
      }

      if (session?.user) {
        // Check if user profile exists
        const { data: profile } = await supabase
          .from('users')
          .select()
          .eq('id', session.user.id)
          .single();

        // If no profile exists, create one
        if (!profile) {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
                email: session.user.email,
                is_organizer: false,
                is_judge: false,
              },
            ]);

          if (profileError) {
            console.error('Error creating user profile:', profileError);
          }
        }

        navigate('/dashboard');
      } else {
        navigate('/auth/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}