# Tarot App - タロット占いアプリ

振動フィードバック付きのタロット占いアプリです。

## 完成した機能

### ✅ 実装済み

- **レイヤードアーキテクチャ**
  - Presentation層: UIコンポーネント
  - Application層: サービス、ストア
  - Domain層: モデル、定数
  - Infrastructure層: モックAPI

- **タロットカード**
  - 78枚すべて定義済み（メジャーアルカナ22枚 + マイナーアルカナ56枚）
  - カード情報（名前、正位置・逆位置の意味）

- **スプレッド**
  - ワンオラクル（1枚引き）
  - スリーカード（過去・現在・未来）
  - ケルト十字（10枚）

- **アニメーション**
  - シャッフルアニメーション
  - カードめくりアニメーション（3D flip）

- **振動フィードバック**
  - シャッフル時
  - カード選択時
  - カードめくり時
  - 設定でON/OFF可能

- **モックAPI**
  - リーディング保存・取得・更新・削除
  - 設定保存・取得
  - メモリ内でデータ管理（DBは未接続）

- **レスポンシブデザイン**
  - モバイルファースト
  - ダークモード対応

## 開発サーバーの起動

```bash
# 依存関係のインストール（初回のみ）
npm install

# 開発サーバー起動
npm run dev
```

開発サーバーは既に起動済みです！
**http://localhost:5173/** にアクセスしてください。

## 使い方

1. **ホーム画面**
   - スプレッド（占い方）を選択
   - 「シャッフル」ボタンでカードをシャッフル
   - 「カードを引く」ボタンで占いを開始
   - カードをタップしてめくる
   - 「保存」ボタンでリーディングを保存

2. **設定画面**
   - 振動フィードバックのON/OFF
   - お気に入りスプレッドの選択

## プロジェクト構造

```
src/
├── lib/
│   ├── presentation/          # UIコンポーネント
│   │   ├── components/
│   │   │   ├── Card.svelte    # カードコンポーネント
│   │   │   ├── Deck.svelte    # デッキコンポーネント
│   │   │   └── Spread.svelte  # スプレッド表示
│   │   └── styles/
│   │       └── global.css     # グローバルスタイル
│   │
│   ├── application/           # ビジネスロジック
│   │   ├── stores/
│   │   │   ├── tarot.ts       # カード状態管理
│   │   │   ├── reading.ts     # リーディング管理
│   │   │   └── settings.ts    # 設定管理
│   │   └── services/
│   │       ├── shuffle.service.ts  # シャッフル
│   │       ├── reading.service.ts  # リーディング
│   │       └── haptic.service.ts   # 振動フィードバック
│   │
│   ├── domain/                # ドメインモデル
│   │   ├── models/
│   │   │   ├── Card.ts
│   │   │   ├── Spread.ts
│   │   │   └── Reading.ts
│   │   └── constants/
│   │       ├── tarot-cards.ts       # 78枚のカードデータ
│   │       └── vibration-patterns.ts # 振動パターン
│   │
│   └── infrastructure/        # インフラ層
│       └── cache/             # キャッシュ（未実装）
│
└── routes/                    # SvelteKitルーティング
    ├── +layout.svelte         # 共通レイアウト
    ├── +page.svelte           # メイン画面
    ├── settings/
    │   └── +page.svelte       # 設定画面
    └── api/                   # モックAPIエンドポイント
        ├── readings/
        │   ├── +server.ts     # GET/POST
        │   └── [id]/
        │       └── +server.ts # GET/PUT/DELETE
        └── settings/
            └── +server.ts     # GET/PUT
```

## 次のステップ（将来の拡張）

- [ ] PostgreSQL + Prismaの接続
- [ ] 実際のカード画像追加
- [ ] リーディング履歴画面
- [ ] ユーザー認証
- [ ] カスタムスプレッド作成
- [ ] メモ編集機能の強化

## 技術スタック

- **Frontend**: Svelte 5 + SvelteKit
- **Language**: TypeScript
- **Styling**: CSS (Scoped Styles)
- **Animation**: Svelte Motion
- **State**: Svelte Stores
- **Build**: Vite

## 注意事項

- 現在はモックAPIを使用しており、ページをリロードするとデータは消えます
- 振動APIはモバイルブラウザでのみ動作します（PCでは動作しません）
- カード画像は実装されていません（今後追加予定）
