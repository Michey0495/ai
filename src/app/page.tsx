import { Suspense } from "react";
import { QuestionForm } from "@/components/QuestionForm";
import { QACard } from "@/components/QACard";
import { getRecentQuestions } from "@/lib/storage";
import { Separator } from "@/components/ui/separator";

async function RecentQAs() {
  const questions = await getRecentQuestions(20);
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

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="text-5xl">🍡</div>
        <h1 className="text-2xl font-bold text-slate-800">AIマシュマロ</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          匿名で質問するとAIキャラクター「マシュ」が<br className="sm:hidden" />
          個性的に回答します
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">マシュに質問する</h2>
        <QuestionForm />
      </div>

      <Separator />

      {/* Recent Q&As */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700">最近の回答</h2>
        <Suspense fallback={<p className="text-sm text-slate-400">読み込み中…</p>}>
          <RecentQAs />
        </Suspense>
      </div>
    </div>
  );
}
