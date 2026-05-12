import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envLines = envContent.split('\n');
const envParams = {};
envLines.forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        envParams[parts[0]] = parts.slice(1).join('=').trim();
    }
});

const supabaseUrl = envParams['VITE_SUPABASE_URL'];
const supabaseAnonKey = envParams['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupAdmin() {
  const email = 'admin@panditt4pooja.in';
  const password = 'Ankush@7890';
  const fullName = 'Super Admin';

  console.log("Attempting to log in...");
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
  });
  
  if (signInError) {
      console.error("Error signing in:", signInError.message);
      return;
  }
  
  console.log("Logged in successfully. Setting role to admin...");
  const { error: updateError } = await supabase
      .from('profiles')
      .upsert({ 
          id: signInData.user.id, 
          email: email, 
          role: 'admin',
          full_name: fullName
      });
      
  if (updateError) {
      console.error("Error updating profile role:", updateError.message);
  } else {
      console.log("SUCCESS! Admin profile setup complete.");
  }
}

setupAdmin();
