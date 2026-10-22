import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhxvnsctlgpohppihzaf.supabase.co";
const supabasePublishableKey = "sb_publishable_2MieEh29hP3dauVQHqeQxQ_DCddiCzJ";

const secureStoreAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      storage: secureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);