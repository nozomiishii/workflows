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

## Job 命名規則

reusable workflow を呼び出すと、GitHub は check 名を **`<caller-job-name> / <reusable-inner-job-name>`** の合成で出力する（単体 workflow の `<job-name>` とは別物。branch protection の required_status_checks に影響）。

本 repo では **`<workflow> / <role>`** で統一:

| reusable workflow | 内側 job 名（role） | caller 側 job 名（workflow） | 合成 check 名 |
|---|---|---|---|
| `pull-request.yaml` | `validate` | `pull-request` | `pull-request / validate` |
| `actionlint.yaml` | `lint` | `actionlint` | `actionlint / lint` |
| `secretlint.yaml` | `scan` | `secretlint` | `secretlint / scan` |

規則:

- reusable 側の内側 job 名は「**そのワークフローが何をするか**」を動詞的に表す（`validate` / `lint` / `scan` / `build` 等）
- caller 側の job 名は「**どのワークフローを呼んでいるか**」= ファイル名の拡張子を除いた部分と一致させる
- 合成された check 名が **`<workflow-name> / <role>`** という自然な英語に読めるようにする

dogfood の `_<name>.yaml` でもこの規則を守る（本 repo の CI も他 repo の caller と同じ命名になる）。

## 新しい reusable workflow を追加する時

1. `.github/workflows/<name>.yaml` に `on: workflow_call:` で実体を書く
2. 内側 job 名は **役割（`validate` / `lint` / `scan` / `build` 等）** にする
3. `.github/workflows/_<name>.yaml` に dogfood CI を追加（caller 側 job 名は `<name>` と一致させる）
4. `README.md` / `README.ja.md` に使用例を追記（caller 側 job 名も `<name>` で書く）
5. conventional commits で `feat:` コミット → Release Please が minor bump した PR を自動起票
