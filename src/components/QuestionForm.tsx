"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 280;

export function QuestionForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: value.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error ?? "エラーが発生しました");
        setIsLoading(false);
        return;
      }

      const question = await res.json();
      toast.success("マシュが回答しました！");
      router.push(`/q/${question.id}`);
    } catch {
      toast.error("通信エラーが発生しました。しばらく後にお試しください。");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="マシュへの質問を入力してください（匿名）"
        aria-label="質問を入力"
        maxLength={MAX_LENGTH}
        rows={4}
        className="resize-none text-sm"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <span className={`text-xs ${value.length > MAX_LENGTH * 0.9 ? "text-orange-500" : "text-slate-400"}`}>
          {value.length} / {MAX_LENGTH}
        </span>
        <Button type="submit" disabled={!value.trim() || isLoading} size="sm">
          {isLoading ? "マシュが考え中…" : "質問を送る 🍡"}
        </Button>
      </div>
    </form>
  );
}
