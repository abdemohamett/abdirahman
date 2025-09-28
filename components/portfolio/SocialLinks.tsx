"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { XIcon, InstagramIcon, YouTubeIcon, GitHubIcon, LinkedInIcon } from "./BrandIcons";

type Social = {
  label: string;
  href: string;
  icon: "x" | "instagram"  | "github" | "linkedin";
  handle?: string;
};

 const iconFor = (name: Social["icon"]) => {
  switch (name) {
    case "x":
      return <XIcon />;
    case "instagram":
      return <InstagramIcon />;
      return <YouTubeIcon />;
    case "github":
      return <GitHubIcon />;
    case "linkedin":
      return <LinkedInIcon />;
  }
};

 const brandColor: Record<Social["icon"], string> = {
  x: "#000000",
  instagram: "#E4405F",
  github: "#000000",
  linkedin: "#0A66C2",
 };

export function SocialLinks({ items }: { items: Social[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((s) => (
        <Button
          key={s.href}
          asChild
          variant="secondary"
          className="rounded-xl px-3 h-11 bg-white text-foreground shadow-sm hover:shadow transition-shadow dark:bg-card"
        >
          <Link href={s.href} target="_blank" rel="noreferrer">
            <span
              className="mr-2 inline-flex items-center justify-center rounded-full h-7 w-7"
              style={{ color: brandColor[s.icon], border: `1px solid ${brandColor[s.icon]}20` }}
            >
              {iconFor(s.icon)}
            </span>
            {s.handle ? <span className="font-normal">@{s.handle}</span> : s.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}


