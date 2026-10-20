import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhxvnsctlgpohppihzaf.supabase.co";
const supabasePublishableKey = "sb_publishable_2MieEh29hP3dauVQHqeQxQ_DCddiCzJ";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);