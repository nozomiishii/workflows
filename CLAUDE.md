# CLAUDE.md

このリポジトリで Claude Code (claude.ai/code) が作業する際のガイドラインです。

## リポジトリの目的

nozomiishii の全 repo で共有する GitHub Actions reusable workflow を集中管理する repo。caller 側は 5 行程度のラッパーで `uses: nozomiishii/workflows/.github/workflows/<name>.yaml@<sha>` として呼び出す。

## Git・GitHub 運用ルール

- PR タイトルは英語 semantic 形式（`feat` / `fix` / `chore` のみ）。CI の semantic pull request チェックに従う。
- **GitHub Actions**: `uses:` は可変タグではなく**コミット SHA（40 文字のフルハッシュ）**で固定する。直前に `# actions/checkout@v6` のように人間向けタグコメントを残す。
- **新バージョン**: 仕様を変える時は conventional commits の `feat:` / `fix:` を使う。Release Please が CHANGELOG とタグを自動管理する。`feat!:` や `BREAKING CHANGE:` で major bump。

## アーキテクチャ

### ワークフローの 3 層構造

`.github/workflows/` には役割の異なる 3 層が混在する。GitHub Actions はサブディレクトリをサポートしないためフラット構造必須。**アンダースコアの本数で「外部からの見え方」を段階的に表現する**:

| prefix | 層 | 例 | 意味 |
|---|---|---|---|
| なし | **Library (reusable)** | `pull-request.yaml` / `actionlint.yaml` / `secretlint.yaml` | 外部 caller が `uses: nozomiishii/workflows/.github/workflows/<name>.yaml@<sha>` で呼ぶ公開 API。`on: workflow_call:` 必須 |
| `_` | **Dogfood (self-CI)** | `_pull-request.yaml` / `_actionlint.yaml` / `_secretlint.yaml` | 本 repo 自身の PR/push に対して、Library を `./` で呼ぶ自 caller。他 repo の caller と同じ形式で自身を検証する |
| `__` | **Repo-own (meta)** | `__release.yaml` | 外部 caller から参照されない、本 repo 運営専用。Release Please 等の内部自動化 |

- 0 本 = 外向き（caller API）
- 1 本 = 半内向き（dogfood: 外から呼ばれる形を模して内から呼ぶ）
- 2 本 = 完全内向き（repo-own）

Python の dunder (`__init__` 等) と同じ慣例で、`__` は「この repo 内部でのみ意味を持つ」ことを示す。

### その他の設定ファイル

- `.github/.release-please-config.json` / `.release-please-manifest.json`: Release Please 設定（`__release.yaml` から参照される）
- `__release.yaml` は `OP_SERVICE_ACCOUNT_TOKEN` secret を要する（1Password 経由で release-please 用 GitHub App 認証を取得）

## Job 命名規則

reusable workflow を呼び出すと、GitHub は check 名を **`<caller-job-name> / <reusable-inner-job-name>`** の合成で出力する（単体 workflow の `<job-name>` とは別物。branch protection の required_status_checks に影響）。

### 単一ツール workflow（1 workflow = 1 ツール）

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

### Aggregator pattern workflow（1 workflow = 複数ツール）

複数のツールを 1 つの workflow に束ねる場合（例: `github-actions.yaml` が actionlint + zizmor を束ねる）は、**内側 job 名をツール名にする**。合成 check 名が `<aggregator> / <tool>` となり、**どのツールが検出したか**が識別できるようにする。

| reusable workflow | 内側 job 名（tool） | 合成 check 名 |
|---|---|---|
| `github-actions.yaml` | `actionlint` | `github-actions / actionlint` |
| `github-actions.yaml` | `zizmor` | `github-actions / zizmor` |
| `github-actions.yaml` | `required`（集約）| `github-actions / required` |
| `secret-scan.yaml` | `secretlint` | `secret-scan / secretlint` |

規則:

- workflow 名は**対象領域または concern**を表す（`github-actions` = workflow ファイル対象、`secret-scan` = secret 漏洩検知）。広すぎる概念名（`security` 等）は避ける
- 内側 job 名は**ツール名**（`actionlint` / `zizmor` / `secretlint` / `gitleaks` 等）
- paths-filter 等で条件実行する場合は、aggregator 用の集約 job として `required` job を追加し、`if: always()` + `needs.*.result` で集約する。branch protection の required check はこの `<aggregator> / required` を単一エントリポイントとして登録する（`required` 命名は TypeScript や astral (ruff/uv) の流派に倣う。`success` は誤読の余地があるため避ける）
- caller 側の job 名は単一ツール時と同じく、ファイル名と一致させる（例: `github-actions.yaml` を呼ぶ caller 側 job は `github-actions`）

### dogfood での遵守

dogfood の `_<name>.yaml` でもこれらの規則を守る（本 repo の CI も他 repo の caller と同じ命名になる）。

## 新しい reusable workflow を追加する時

1. `.github/workflows/<name>.yaml` に `on: workflow_call:` で実体を書く
2. 内側 job 名を決める:
   - 単一ツール workflow → **役割**（`validate` / `lint` / `scan` / `build` 等）
   - Aggregator pattern workflow → **ツール名**（`actionlint` / `zizmor` / `secretlint` 等）+ 集約用 `required` job
3. `.github/workflows/_<name>.yaml` に dogfood CI を追加（caller 側 job 名は `<name>` と一致させる）
4. `README.md` / `README.ja.md` に使用例を追記（caller 側 job 名も `<name>` で書く）
5. conventional commits で `feat:` コミット → Release Please が minor bump した PR を自動起票
