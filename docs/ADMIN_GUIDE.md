# 📋 管理画面の使い方ガイド

## 🔗 アクセス方法

**管理画面URL**: https://beauty-appointment-portal.vercel.app/admin

ブラウザで上記URLにアクセスすると、管理ダッシュボードが表示されます。

---

## 📊 ダッシュボード概要

管理画面のトップページには以下の情報が表示されます。

### 統計カード

| カード名 | 説明 | アイコン |
|---------|------|---------|
| **総予約数** | 今月の予約件数 | 📅 Calendar |
| **今日の予約** | 本日の予約件数 | 🎯 Target |
| **月間売上** | 今月の売上額 | 💰 Dollar |
| **新規顧客** | 新しい顧客数 | 👥 Users |

各カードには前月比の増減率も表示されます。

---

## 🎛️ 管理機能

### 1. 📅 予約管理

**タブ**: "予約管理"

#### 表示内容
- 予約ID
- 顧客名
- サービス名
- スタッフ名
- 予約日時
- ステータス（確認済み/保留中/キャンセル）

#### 操作
```
✅ 確認済み  - 緑色のバッジ
⏳ 保留中    - 黄色のバッジ
❌ キャンセル - 赤色のバッジ
```

#### 予約データの変更方法
`src/app/admin/page.tsx` の `bookings` 配列を編集：

```typescript
const bookings = [
  {
    id: 1,
    customerName: "田中 花子",
    service: "カット + カラー",
    stylist: "佐藤 美咲",
    date: "2024-01-20",
    time: "10:00",
    status: "confirmed" // confirmed / pending / cancelled
  },
  // 新しい予約を追加
  {
    id: 5,
    customerName: "新規 太郎",
    service: "パーマ",
    stylist: "山田 花子",
    date: "2024-01-21",
    time: "14:00",
    status: "pending"
  }
]
```

---

### 2. ✂️ サービス管理

**タブ**: "サービス管理"

#### 表示内容
- サービス名
- 所要時間
- 価格
- カテゴリー
- 編集/削除ボタン

#### サービスの追加・変更方法

`src/lib/mockData.ts` の `salons` データを編集：

```typescript
export const salons: Salon[] = [
  {
    id: 1,
    name: "Bella ビューティーサロン",
    services: [
      {
        id: 1,
        name: "カット",
        duration: 60,
        price: 5000,
        description: "プロのスタイリストによるカット"
      },
      // 新しいサービスを追加
      {
        id: 10,
        name: "ヘッドスパ",
        duration: 45,
        price: 4000,
        description: "リラックスできるヘッドマッサージ"
      }
    ]
  }
]
```

#### 価格の変更
```typescript
{
  id: 1,
  name: "カット",
  price: 5000  // ← この数字を変更
}
```

---

### 3. 👥 スタッフ管理

**タブ**: "スタッフ管理"

#### 表示内容
- スタッフ名
- 役職
- 専門分野
- 評価
- 予約状況（今日/今週）

#### スタッフの追加・変更方法

`src/lib/mockData.ts` の `stylists` 配列を編集：

```typescript
export const salons: Salon[] = [
  {
    id: 1,
    name: "Bella ビューティーサロン",
    stylists: [
      {
        id: 1,
        name: "佐藤 美咲",
        role: "トップスタイリスト",
        specialties: ["カット", "カラー", "パーマ"],
        rating: 4.9,
        image: "/images/stylist1.jpg"
      },
      // 新しいスタッフを追加
      {
        id: 5,
        name: "新人 太郎",
        role: "スタイリスト",
        specialties: ["カット", "シャンプー"],
        rating: 4.5,
        image: "/images/stylist5.jpg"
      }
    ]
  }
]
```

---

## 🏪 サロン情報の変更

### サロン基本情報の編集

`src/lib/mockData.ts` を開いて編集：

```typescript
export const salons: Salon[] = [
  {
    id: 1,
    name: "Bella ビューティーサロン",  // サロン名
    description: "福岡で最も人気のある...",  // 説明文
    address: "福岡市中央区天神2-3-10",  // 住所
    phone: "092-123-4567",  // 電話番号
    rating: 4.8,  // 評価
    reviewCount: 234,  // レビュー数
    priceRange: "¥¥¥",  // 価格帯
    images: [
      "/images/salon1-1.jpg",
      "/images/salon1-2.jpg"
    ],
    amenities: ["WiFi", "ドリンク", "雑誌"],  // 設備
    openingHours: {
      weekday: "10:00 - 20:00",
      weekend: "10:00 - 19:00"
    }
  }
]
```

### 新しいサロンの追加

```typescript
export const salons: Salon[] = [
  // 既存のサロン...
  
  // 新しいサロンを追加
  {
    id: 11,
    name: "新規サロン",
    description: "新しくオープンしたサロン",
    address: "福岡市博多区博多駅前1-1-1",
    phone: "092-999-0000",
    rating: 4.5,
    reviewCount: 50,
    priceRange: "¥¥",
    images: ["/images/new-salon.jpg"],
    amenities: ["WiFi", "駐車場"],
    openingHours: {
      weekday: "9:00 - 21:00",
      weekend: "9:00 - 20:00"
    },
    services: [],
    stylists: []
  }
]
```

---

## 🎨 デザインのカスタマイズ

### 統計カードの色を変更

`src/app/admin/page.tsx` を編集：

```typescript
{/* 総予約数カード */}
<div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm text-gray-600">総予約数</span>
    <Calendar className="w-5 h-5 text-blue-500" />  {/* ← 色を変更 */}
  </div>
</div>
```

利用可能な色：
- `text-blue-500` - 青
- `text-red-500` - 赤
- `text-green-500` - 緑
- `text-purple-500` - 紫
- `text-pink-500` - ピンク
- `text-yellow-500` - 黄色

### ダッシュボードのタイトル変更

```typescript
<div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold mb-2">
      ビジネスダッシュボード  {/* ← タイトル変更 */}
    </h1>
    <p className="text-gray-600">
      予約とサービスを管理  {/* ← サブタイトル変更 */}
    </p>
  </div>
</div>
```

---

## 🚀 変更のデプロイ

### 1. ファイルを編集
VS Codeで必要なファイルを編集します。

### 2. 変更を保存
`Ctrl + S` (Windows/Linux) または `Cmd + S` (Mac)

### 3. Gitにコミット
```bash
git add .
git commit -m "Update: 管理画面の統計データを更新"
```

### 4. GitHubにプッシュ
```bash
git push origin main
```

### 5. 自動デプロイ
Vercelが自動的に検出してデプロイを開始します。
約1-2分で完了し、本番サイトに反映されます。

### 6. デプロイ状況の確認
- **Vercelダッシュボード**: https://vercel.com
- デプロイログでエラーがないか確認
- 緑色のチェックマーク ✅ が表示されればデプロイ成功

---

## 📱 モバイルでの表示

管理画面はレスポンシブデザインです。

### タブレット・スマホでの表示
- 統計カードが縦に並びます
- テーブルがスクロール可能になります
- メニューがハンバーガーアイコンに変わります

### 確認方法
Chrome DevTools（F12キー）→ デバイスツールバーアイコンをクリック

---

## 🔐 セキュリティ（今後の実装推奨）

現在、管理画面は誰でもアクセス可能です。
本番環境では以下の実装を推奨：

### 1. 認証機能の追加
```bash
npm install next-auth
```

### 2. パスワード保護
```typescript
// middleware.ts を作成
export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/admin/:path*"]
}
```

### 3. ロール管理
- オーナー（全権限）
- マネージャー（予約管理のみ）
- スタッフ（閲覧のみ）

---

## 🆘 トラブルシューティング

### 変更が反映されない
1. ブラウザのキャッシュをクリア（Ctrl + Shift + R）
2. Vercelのデプロイが完了しているか確認
3. 正しいファイルを編集したか確認

### エラーが表示される
1. `npm run build` でローカルでビルドテスト
2. エラーメッセージを確認
3. TypeScriptの型エラーをチェック

### デプロイが失敗する
1. Vercelダッシュボードでログを確認
2. GitHubのコミット履歴を確認
3. `package.json` の依存関係を確認

---

## 📞 サポート

質問や問題がある場合：
1. `PROJECT_STRUCTURE.md` を参照
2. Next.js公式ドキュメント: https://nextjs.org/docs
3. Tailwind CSS: https://tailwindcss.com/docs

---

## ✅ クイックチェックリスト

- [ ] 管理画面にアクセスできる
- [ ] 統計データが表示される
- [ ] 予約一覧が表示される
- [ ] サービス一覧が表示される
- [ ] スタッフ一覧が表示される
- [ ] データの編集方法を理解した
- [ ] デプロイの流れを理解した
- [ ] モバイル表示を確認した

---

**🎉 これで管理画面の使い方は完璧です！**

何か変更したいことがあれば、該当するファイルを編集して、
`git add . && git commit -m "..." && git push` するだけです。
