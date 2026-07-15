# あしたのロボティクス コーポレートサイト

[Omakase Robotics](https://www.omakase.ai/robotics) の構成・タイポグラフィ・余白感を参考にした、1ページ構成のコーポレートサイトです。

## 必要な環境

- Node.js 18 以上
- npm 9 以上

## インストール方法

```bash
npm install
```

## 開発サーバーの起動方法

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 本番ビルド方法

```bash
npm run build
npm start
```

## FV画像の保存先

```
public/images/hero-vision.png          # PC
public/images/hero-vision-mobile.png   # スマホ
```

画像がない場合はプレースホルダーが表示されます。

## 事業カード画像（任意）

以下に置くと自動表示されます。未配置のあいだは薄いグレー枠のみです。

```
public/images/capability-1.jpg
public/images/capability-2.jpg
public/images/capability-3.jpg
```

パスは `src/constants/site.ts` の `solution.capabilities[].image` でも変更できます。

## FV画像の推奨サイズ

**1600 × 1200px 以上**（16:9 または 4:3）

## 画像生成用プロンプト

```
明るく洗練された現代の日本の住宅。白と木を基調とした自然なリビング空間の中で、Unitree G1のような小型ヒューマノイドロボットが、人間の家族と同じ生活空間に自然に存在している。
ロボットは中央で目立たせすぎず、観葉植物や家具と同じように暮らしの一部として溶け込んでいる。家族はロボットを特別視せず、ソファでくつろいだり、日常生活を送っている。
朝の柔らかな自然光、清潔感、安心感、現実的な写真表現。過度に未来的な装飾、SF的な都市、ネオン、暗い背景、工場、研究室は避ける。
日本の上質な住宅広告のような構図。ロボット本体や画面にロゴ、文字、ブランド名を入れない。16:9または4:3、超高解像度、フォトリアル。
```

## メールアドレスの変更場所

`src/constants/site.ts` の `email` を変更してください。

## サイト内文章の主な変更場所

会社名・見出し・各セクション文言は `src/constants/site.ts` にまとめています。

## デザイン参考

レイアウト・フォント（Host Grotesk / Montserrat）・見出しサイズ・アクセントカラー（`#0388b7` / `#C7B06A`）は [omakase.ai/robotics](https://www.omakase.ai/robotics) を参考にしています。デモ動画・ニュース・実績など架空のコンテンツは含めていません。
