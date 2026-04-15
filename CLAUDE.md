# CLAUDE.md

このリポジトリで Claude Code (claude.ai/code) が作業する際のガイドラインです。

## リポジトリの目的

nozomiishii の全 repo で共有する GitHub Actions reusable workflow を集中管理する repo。caller 側は 5 行程度のラッパーで `uses: nozomiishii/workflows/.github/workflows/<name>.yaml@<sha>` として呼び出す。

## Git・GitHub 運用ルール

- PR タイトルは英語 semantic 形式（`feat` / `fix` / `chore` のみ）。CI の semantic pull request チェックに従う。
- **GitHub Actions**: `uses:` は可変タグではなく**コミット SHA（40 文字のフルハッシュ）**で固定する。直前に `# actions/checkout@v6` のように人間向けタグコメントを残す。
- **新バージョン**: 仕様を変える時は conventional commits の `feat:` / `fix:` を使う。Release Please が CHANGELOG とタグを自動管理する。`feat!:` や `BREAKING CHANGE:` で major bump。

## アーキテクチャ

### ディレクトリ構成

- `.github/workflows/pull-request.yaml` / `actionlint.yaml` / `secretlint.yaml`: **caller から呼ばれる reusable workflow**（`on: workflow_call:` トリガー、これがライブラリの本体）
- `.github/workflows/_pull-request.yaml` / `_actionlint.yaml` / `_secretlint.yaml`: **本 repo 自身の CI**（dogfooding。同じ reusable workflow をローカル参照 `./` で呼ぶ）
- `.github/workflows/release.yaml`: Release Please（`OP_SERVICE_ACCOUNT_TOKEN` secret 必須）
- `.github/.release-please-config.json` / `.release-please-manifest.json`: Release Please 設定

### reusable と self-CI の分離理由

- caller URL に `_` プレフィックスが出ないよう、library 本体は prefix なしにする
- 本 repo 自身の CI は他 repo と命名を揃えるため `_` プレフィックスを使う

## 新しい reusable workflow を追加する時

1. `.github/workflows/<name>.yaml` に `on: workflow_call:` で実体を書く
2. `.github/workflows/_<name>.yaml` に dogfood CI を追加
3. `README.md` に使用例を追記
4. conventional commits で `feat:` コミット → Release Please が minor bump した PR を自動起票
