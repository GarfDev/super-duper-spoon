import { User } from "@supabase/supabase-js";

export interface AppContext {
  isLoggedIn: boolean;
  user: User | null;
}
