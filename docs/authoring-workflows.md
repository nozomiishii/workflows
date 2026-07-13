# Workflow の書き方

reusable workflow の命名規則・`.github/zizmor.yaml` のコメント書式・追加手順の正本。check 名合成の仕組みは [AGENTS.md](../AGENTS.md) の「Job 命名規則」を参照。

## Job 命名規則

### 単一ツール workflow（1 workflow = 1 ツール）

本 repo では `<workflow> / <role>` で統一:

| reusable workflow | 内側 job 名（role） | caller 側 job 名（workflow） | 合成 check 名 |
|---|---|---|---|
| `pull-request.yaml` | `validate` | `pull-request` | `pull-request / validate` |

規則:

- reusable 側の内側 job 名は「そのワークフローが何をするか」を動詞的に表す（`validate` / `lint` / `scan` / `build` 等）
- caller 側の job 名は「どのワークフローを呼んでいるか」= ファイル名の拡張子を除いた部分と一致させる
- 合成された check 名が `<workflow-name> / <role>` という自然な英語に読めるようにする

### Aggregator pattern workflow（1 workflow = 複数ツール）

複数のツールを 1 つの workflow に束ねる場合（例: `github-actions.yaml` が actionlint + zizmor を束ねる）は、内側 job 名をツール名にする。合成 check 名が `<aggregator> / <tool>` となり、どのツールが検出したかを識別できる。

| reusable workflow | 内側 job 名（tool） | 合成 check 名 |
|---|---|---|
| `github-actions.yaml` | `actionlint` | `github-actions / actionlint` |
| `github-actions.yaml` | `zizmor` | `github-actions / zizmor` |
| `github-actions.yaml` | `required`（集約）| `github-actions / required` |
| `secret-scan.yaml` | `secretlint` | `secret-scan / secretlint` |

規則:

- workflow 名は対象領域または concern を表す（`github-actions` = workflow ファイル対象、`secret-scan` = secret 漏洩検知）。広すぎる概念名（`security` 等）は避ける
- 内側 job 名はツール名（`actionlint` / `zizmor` / `secretlint` / `gitleaks` 等）
- paths-filter 等で条件実行する場合は、集約 job として `required` job を追加し、`if: always()` + `needs.*.result` で集約する。branch protection の required check はこの `<aggregator> / required` を単一エントリポイントとして登録する（`required` 命名は TypeScript や astral (ruff/uv) の流派に倣う。`success` は誤読の余地があるため避ける）
- caller 側の job 名は単一ツール時と同じく、ファイル名と一致させる（例: `github-actions.yaml` を呼ぶ caller 側 job は `github-actions`）

### dogfood での遵守

dogfood の `_<name>.yaml` でもこれらの規則を守る（本 repo の CI も他 repo の caller と同じ命名になる）。

## `.github/zizmor.yaml` のコメント書式

ignore / disable / allowlist を追加する各 rule には、なぜその rule を適用外にしたかを日本語で明示するコメントを付ける。書式は次の 3 要素:

- ルール概要: その audit が何を検出するかを 1 文で
- メリット vs デメリット比較: rule に従う場合の benefit と、本 repo の文脈で発生する cost を対比する
- 結論: この repo ではどちらが上回るかの判断と採った対応（`disable` / `ignore` / `config.allow` 等）

benefit をゼロ扱いせず、存在を認めた上で repo の文脈では上回らないという形で書く。将来 repo の事情が変わった時に再評価しやすくなる。実例は [.github/zizmor.yaml](../.github/zizmor.yaml) の `anonymous-definition` コメントを参照。

## 新しい reusable workflow を追加する時

- `.github/workflows/<name>.yaml` に `on: workflow_call:` で実体を書く
- 内側 job 名を決める
  - 単一ツール workflow → 役割（`validate` / `lint` / `scan` / `build` 等）
  - Aggregator pattern workflow → ツール名（`actionlint` / `zizmor` / `secretlint` 等）+ 集約用 `required` job
- `.github/workflows/_<name>.yaml` に dogfood CI を追加（caller 側 job 名は `<name>` と一致させる）
- `README.md` / `README.ja.md` に使用例を追記（caller 側 job 名も `<name>` で書く）
- conventional commits で `feat:` コミット → Release Please が minor bump した PR を自動起票
