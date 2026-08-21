import type { MetadataRoute } from "next";
import { site } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.seo.homeTitle,
    short_name: site.nameEn,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff6ec",
    theme_color: "#1a1a1a",
    lang: "ja",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
