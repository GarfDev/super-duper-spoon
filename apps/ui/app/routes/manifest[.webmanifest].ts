import type { WebAppManifest } from "@remix-pwa/dev";

export const loader = () => {
  return Response.json(
    {
      short_name: "GWA",
      name: "GGWP PWA",
      description: "Nothing special, just a thing that working.",
      start_url: "/",
      display: "standalone",
      background_color: "#272829",
      theme_color: "#777474",
    } as WebAppManifest,
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
