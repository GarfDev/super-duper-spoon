import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useOutletContext } from "@remix-run/react";
import { createSeverClient } from "~/supabase.server";

import ChatWindow from "~/components/ChatArea";
import ChatForm from "~/components/ChatForm";
import { AppContext } from "~/types/AppContext";

export const meta: MetaFunction = () => {
  return [
    { title: "GGWP!" },
    { name: "description", content: "Welcome hehe!" },
  ];
};

export async function action({ request }: LoaderFunctionArgs) {
  const { supabase, headers } = createSeverClient(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "signin-anonymous") {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (data) {
      return Response.json({ isLoggedIn: true }, { headers });
    }

    if (error) {
      console.log(error);
      return Response.json({ isLoggedIn: false, error }, { headers });
    }
  }
  return Response.json({ isLoggedIn: false }, { headers });
}

export default function Index() {
  const fetcher = useFetcher();

  const onAnonymousSignIn = () => {
    fetcher.submit({ intent: "signin-anonymous" }, { method: "POST" });
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="flex max-w-3xl w-full h-[90vh] flex-col items-center gap-16">
        <ChatWindow />

        <ChatForm />
      </div>
    </div>
  );
}
