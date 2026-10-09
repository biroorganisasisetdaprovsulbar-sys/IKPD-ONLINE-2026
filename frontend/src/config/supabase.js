import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "MASUKKAN_URL_SUPABASE";
const supabaseKey = "MASUKKAN_ANON_KEY_SUPABASE";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
