import { Suspense } from "react";
import { QuestionForm } from "@/components/QuestionForm";
import { QACard } from "@/components/QACard";
import { getRecentQuestions } from "@/lib/storage";
import { Separator } from "@/components/ui/separator";

async function RecentQAs() {
  const questions = await getRecentQuestions(50);
  if (questions.length === 0) {
    return (
      <p className="text-center text-slate-400 text-sm py-8">
        まだ質問がありません。最初の質問をしてみましょう！
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <QACard key={q.id} question={q} showLink />
      ))}
    </div>
  );
}

const FEATURES = [
  { icon: "🔓", label: "アカウント不要" },
  { icon: "✨", label: "完全無料" },
  { icon: "⚡", label: "AI即回答" },
] as const;

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="text-5xl">🍡</div>
        <h1 className="text-2xl font-bold text-slate-800 leading-snug">
          誰にも言えないこと、<br />
          マシュに聞いてみませんか？
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          匿名でOK。恋愛・悩み・くだらない疑問、なんでも。<br className="sm:hidden" />
          AIキャラクター「マシュ」が温かく・個性的に回答します。
        </p>
        {/* Feature badges */}
        <div className="flex justify-center gap-3 flex-wrap">
          {FEATURES.map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 rounded-full px-3 py-1"
            >
              {icon} {label}
            </span>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">マシュに質問する</h2>
        <p className="text-xs text-slate-400 mb-4">例：「失恋してつらい」「なんで空は青いの？」「仕事やめたい」</p>
        <QuestionForm />
      </div>

      <Separator />

      {/* Recent Q&As — social proof */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700">みんなの質問・回答</h2>
          <span className="text-xs text-slate-400">（匿名）</span>
        </div>
        <Suspense fallback={<p className="text-sm text-slate-400">読み込み中…</p>}>
          <RecentQAs />
        </Suspense>
      </div>
    </div>
  );
}
