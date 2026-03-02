# QA Report — AIマシュマロ

**Date:** 2026-03-01
**Tester:** Claude QA Agent
**Project:** ai-marshmallow (`/Users/lily/Desktop/dev/02dev/ai`)

---

## Build & Lint

| Check | Result |
|-------|--------|
| `npm run build` | ✅ Passed |
| `npm run lint` | ✅ Passed |
| TypeScript | ✅ No errors |

---

## Issues Found & Fixed

### 1. Missing custom 404 page [FIXED]
- **Severity:** Medium
- **File created:** `src/app/not-found.tsx`
- **Details:** No custom 404 page existed. Created a branded not-found page with navigation back to home.

### 2. Missing OGP image (og:image) [FIXED]
- **Severity:** High — affects SNS share previews
- **Files created:**
  - `src/app/opengraph-image.tsx` — static home page OGP (gradient with logo/title)
  - `src/app/q/[id]/opengraph-image.tsx` — dynamic Q&A OGP showing question + answer text
- **Details:** No og:image was set, causing blank previews when shared on Twitter/X, LINE, etc.

### 3. Missing `metadataBase` [FIXED]
- **Severity:** Medium — causes Next.js warning and incorrect absolute URL generation for OGP
- **File:** `src/app/layout.tsx`
- **Fix:** Added `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai.ezoai.jp")`

### 4. No robots.txt / sitemap.xml [FIXED]
- **Severity:** Low-Medium — SEO crawl guidance missing
- **Files created:**
  - `src/app/robots.ts` — allows all crawlers, references sitemap
  - `src/app/sitemap.ts` — lists `/` and `/about` with priority/frequency hints

### 5. ShareButtons — no copy feedback [FIXED]
- **Severity:** Low — UX issue
- **File:** `src/components/ShareButtons.tsx`
- **Fix:** Added `copied` state. Button text changes to "コピーしました！" for 2 seconds after clicking.

### 6. FeedbackWidget close button — no aria-label [FIXED]
- **Severity:** Low — accessibility
- **File:** `src/components/FeedbackWidget.tsx`
- **Fix:** Added `aria-label="閉じる"` to the `×` button.

### 7. QuestionForm textarea — no accessible label [FIXED]
- **Severity:** Low — accessibility
- **File:** `src/components/QuestionForm.tsx`
- **Fix:** Added `aria-label="質問を入力"` to the Textarea element.

---

## Issues Confirmed OK (No Fix Needed)

| Area | Status | Notes |
|------|--------|-------|
| Input validation | ✅ | 280 char limit enforced on both client and server |
| Error state display | ✅ | QuestionForm shows error messages |
| Loading state | ✅ | Button shows "マシュが考え中…" during API call |
| Responsive layout | ✅ | `max-w-2xl mx-auto px-4` — works mobile to desktop |
| Favicon | ✅ | `src/app/favicon.ico` exists |
| Lang attribute | ✅ | `<html lang="ja">` set |
| Suspense fallback | ✅ | RecentQAs wrapped in Suspense with fallback text |
| Special character handling | ✅ | `whitespace-pre-wrap break-words` on answer/question text |
| Long text handling | ✅ | `break-words` prevents overflow; server truncates OGP text |
| API input sanitization | ✅ | `trim()` applied, type checked, length validated |
| In-memory fallback | ✅ | Works without KV env vars (dev/staging) |
| KV production storage | ✅ | Conditional import of `@vercel/kv` |
| GA integration | ✅ | Conditional on `NEXT_PUBLIC_GA_ID` env var |
| SNS share URLs | ✅ | Properly encoded with `encodeURIComponent` |
| `noopener noreferrer` | ✅ | On all external `target="_blank"` links |
| Per-question metadata | ✅ | `generateMetadata` on `/q/[id]` for Twitter card |

---

## Remaining Gaps (Non-blocking)

| Item | Priority | Notes |
|------|----------|-------|
| Rate limiting on `/api/questions` | Medium | No rate limiting; could be spammed. Mitigated by AI cost. Add if needed post-launch. |
| Content moderation | Low | SYSTEM_PROMPT instructs model but no hard filter. Monitor post-launch. |
| `loading.tsx` route files | Low | Suspense handles home page; individual Q page loads fast enough. |
| Structured data (JSON-LD) | Low | Not required for MVP |

---

## Checklist Summary

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon 設定済み
- [x] OGP画像設定済み（ImageResponse による動的生成）
- [x] 404ページ
- [x] ローディング状態の表示
- [x] エラー状態の表示
- [x] robots.txt / sitemap.xml
- [x] 基本的なa11y対応（aria-label）

---

**総評:** MVPとして本番リリース可能な品質。主要なSEO・アクセシビリティ・UX問題はすべて修正済み。
