"use client";

import { Button } from "@/components/ui/button";

type Props = {
  url: string;
  text: string;
};

export function ShareButtons({ url, text }: Props) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex gap-3 flex-wrap">
      <Button asChild size="sm" className="bg-black hover:bg-zinc-800 text-white">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          𝕏 でシェア
        </a>
      </Button>
      <Button asChild size="sm" className="bg-[#06C755] hover:bg-[#05a848] text-white">
        <a href={lineUrl} target="_blank" rel="noopener noreferrer">
          LINE でシェア
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigator.clipboard.writeText(url)}
      >
        リンクをコピー
      </Button>
    </div>
  );
}
