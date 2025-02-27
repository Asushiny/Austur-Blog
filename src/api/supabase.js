//链接supabase
// import {
// 	createClient
// } from '@supabase/supabase-js'

// export const supabase = createClient('https://dtlhdzlqambljsilvnrf.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bGhkemxxYW1ibGpzaWx2bnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDk4NTIsImV4cCI6MjA1NjEyNTg1Mn0.jKyIIuhmiirvtZKrR2eFJvyl3_Tx8rF2EYLGuOe0qdA'
// )

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://dtlhdzlqambljsilvnrf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0bGhkemxxYW1ibGpzaWx2bnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDk4NTIsImV4cCI6MjA1NjEyNTg1Mn0.jKyIIuhmiirvtZKrR2eFJvyl3_Tx8rF2EYLGuOe0qdA';

export const supabase = createClient(supabaseUrl, supabaseKey);