// ==================================================
// SUPABASE CONNECTION
// IKPD ONLINE 2026
// ==================================================

require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);


module.exports = supabase;