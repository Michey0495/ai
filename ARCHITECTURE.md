# AIマシュマロ - アーキテクチャ設計

## 概要
匿名で質問を投稿するとAIキャラクターが個性的に回答するQ&Aサービス。
各回答はユニークURLで共有可能でSNS拡散を促進する。

## ページ構成

```
/ (Home)
  - 質問投稿フォーム
  - 最近の Q&A 一覧（20件）

/q/[id] (Q&A詳細)
  - 質問・回答の表示
  - OGP対応（SNS共有用）
  - Twitter/X・LINEシェアボタン

/about (About)
  - サービス説明
  - AIキャラクター紹介
```

## コンポーネント設計

```
src/
  app/
    layout.tsx          # Root layout (メタデータ・フォント)
    page.tsx            # Home: 質問フォーム + Q&A一覧
    about/page.tsx      # About page
    q/[id]/page.tsx     # Q&A詳細 (SSR + OGP)
    api/
      questions/route.ts        # GET (一覧) / POST (質問投稿)
      questions/[id]/route.ts   # GET (詳細取得)

  components/
    QuestionForm.tsx    # 質問投稿フォーム (client)
    QACard.tsx          # Q&Aカード表示
    ShareButtons.tsx    # SNSシェアボタン (Twitter/LINE)
    Header.tsx          # サイトヘッダー
    Footer.tsx          # フッター

  lib/
    ai.ts               # Anthropic API呼び出し
    storage.ts          # Vercel KV / メモリストレージ
    types.ts            # 型定義
```

## データモデル

```typescript
type Question = {
  id: string;           // nanoid (8文字)
  content: string;      // 質問内容 (max 280文字)
  answer: string;       // AI回答
  createdAt: string;    // ISO8601
}
```

## API設計

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/questions | 最新20件取得 |
| POST | /api/questions | 質問投稿 → AI回答生成 |
| GET | /api/questions/[id] | 個別Q&A取得 |

## AIキャラクター設定

- 名前: **マシュ**（マシュマロの妖精）
- 口調: 明るく、親しみやすく、時々ユニークな視点
- 特徴: 日本語で回答、絵文字適度に使用、200〜400文字程度

## ストレージ戦略

```
Development: in-memory (Map) → 再起動でリセット
Production: Vercel KV (Redis)
  - Key: question:{id} → Question JSON
  - Key: questions:list → id[] (最新順、最大100件)
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: Anthropic Claude API (claude-haiku-4-5)
- **Storage**: Vercel KV
- **Hosting**: Vercel
- **Domain**: ai.ezoai.jp
