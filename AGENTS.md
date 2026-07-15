# Repository Guidelines

## リポジトリの目的

nozomiishii の全 repo で共有する GitHub Actions reusable workflow を集中管理する repo。caller 側は 5 行程度のラッパーで `uses: nozomiishii/workflows/.github/workflows/<name>.yaml@<sha>` として呼び出す。

## アーキテクチャ

### ワークフローの 3 層構造

`.github/workflows/` には役割の異なる 3 層が混在する。GitHub Actions はサブディレクトリを持てずフラット構造必須なので、アンダースコアの本数で「外部からの見え方」を段階的に表現する。

| prefix | 層 | 例 | 意味 |
|---|---|---|---|
| なし | Library (reusable) | `pull-request.yaml` / `github-actions.yaml` / `secret-scan.yaml` | 外部 caller が `uses: nozomiishii/workflows/.github/workflows/<name>.yaml@<sha>` で呼ぶ公開 API。`on: workflow_call:` 必須 |
| `_` | Dogfood (self-CI) | `_pull-request.yaml` / `_github-actions.yaml` / `_secret-scan.yaml` | 本 repo 自身の PR/push に対して、Library を `./` で呼ぶ自 caller。他 repo の caller と同じ形式で自身を検証する |
| `__` | Repo-own (meta) | `__release.yaml` | 外部 caller から参照されない、本 repo 運営専用。Release Please 等の内部自動化 |

- 0 本 = 外向き（caller API）
- 1 本 = 半内向き（dogfood: 外から呼ばれる形を模して内から呼ぶ）
- 2 本 = 完全内向き（repo-own）

Python の dunder (`__init__` 等) と同じ慣例で、`__` は「この repo 内部でのみ意味を持つ」ことを示す。

## Job 命名規則

reusable workflow を呼び出すと、GitHub は check 名を `<caller-job-name> / <reusable-inner-job-name>` の合成で出力する（単体 workflow の `<job-name>` とは別物。branch protection の required_status_checks に影響）。命名規則の詳細は [docs/authoring-workflows.md](docs/authoring-workflows.md) を参照。

## Lint / 監査の方針

### zizmor — 全 finding を CI で落とす

`github-actions.yaml` 内の zizmor は `advanced-security: false` 固定で、`--min-severity` / `--no-exit-codes` は使わない。結果として、`informational` を含むあらゆる severity の finding で CI が赤くなる。

これは警告放置を構造的に防ぐための意図的な opinion。GitHub Advanced Security の SARIF upload パスは提供しない（Code Scanning の PR comment は triage されずに放置されやすいため）。

### finding が出たら

必ず対応を決める。スルーは禁止。選択肢は 2 つ:

- 修正する（推奨）— finding の原因を直接修正する
- 明示的に ignore する
  - 継続的な ignore: `.github/zizmor.yaml` にルールを追加する（理由をコメントで残す）
  - one-off な ignore: 該当行に `# zizmor: ignore[<rule>]` inline コメント（例外的用途のみ）

caller 側（他 repo）でも同じ方針を推奨（README に記載）。

### `.github/zizmor.yaml` のコメント書式

ignore / disable を追加する rule に付けるコメントの書式は [docs/authoring-workflows.md](docs/authoring-workflows.md) を参照。

## 新しい reusable workflow を追加する時

追加手順のチェックリストは [docs/authoring-workflows.md](docs/authoring-workflows.md) を参照。
