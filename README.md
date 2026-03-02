# AIマシュマロ 🍡

匿名で質問するとAIキャラクター「マシュ」が個性的に回答するQ&Aサービス。

## 概要

- 匿名で質問を投稿 → AIが即座に個性的な回答
- 各回答に専用URLが発行されSNSでシェア可能
- Twitter/X・LINEシェア対応

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: Anthropic Claude API (claude-haiku-4-5)
- **Storage**: Vercel KV (開発時はin-memory)
- **Hosting**: Vercel
- **Domain**: ai.ezoai.jp

## セットアップ

```bash
npm install
# .env.local に ANTHROPIC_API_KEY を設定
npm run dev
```

## 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API Key | ✅ |
| `KV_REST_API_URL` | Vercel KV URL (本番) | - |
| `KV_REST_API_TOKEN` | Vercel KV Token (本番) | - |
| `NEXT_PUBLIC_SITE_URL` | サイトURL | - |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | - |
| `GITHUB_TOKEN` | フィードバックをGitHub Issueに投稿 | - |

## ディレクトリ構造

```
src/
  app/
    page.tsx              # ホーム (質問フォーム + 一覧)
    about/page.tsx        # サービス説明
    q/[id]/page.tsx       # Q&A詳細 (シェアページ)
    api/questions/        # API Routes
  components/
    Header.tsx / Footer.tsx
    QuestionForm.tsx      # 質問投稿フォーム
    QACard.tsx            # Q&Aカード
    ShareButtons.tsx      # SNSシェアボタン
  lib/
    ai.ts                 # Anthropic API
    storage.ts            # Vercel KV / in-memory
    types.ts              # 型定義
```

## 進捗

- [x] プロジェクト初期化 (Night 1)
- [x] アーキテクチャ設計
- [x] 共通コンポーネント
- [x] ページ実装 (Home / Q&A詳細 / About)
- [x] API Routes (質問投稿・一覧・詳細)
- [x] フィードバックウィジェット & `/api/feedback` (Night 2)
- [x] Google Analytics サポート (NEXT_PUBLIC_GA_ID) (Night 2)
- [ ] Vercelデプロイ
- [ ] ドメイン設定 (ai.ezoai.jp)
