# Workflow の書き方

reusable workflow の命名規則・`.github/zizmor.yaml` のコメント書式・追加手順の正本。check 名合成の仕組みは [AGENTS.md](../AGENTS.md) の「Job 命名規則」を参照。

## パターンを選ぶ

1 つの workflow に何を束ねるかで 3 パターンある。

```
1 workflow が束ねるツール
  ├─ 1 つ
  │    → 単一ツール
  └─ 複数
       ├─ ジョブ課金を抑えたい
       │    → Preset
       └─ どのツールが落ちたか check 名で識別したい
            → Aggregator pattern
```

GitHub Actions の課金はジョブごとに分単位で切り上げられる。サブミニットのチェック群を job に分けると、PR イベントごとのジョブ課金が積み上がる。分単位課金が効く頻度・規模で使う workflow は Preset を選ぶ。

本 repo が現在提供する workflow は `recommended.yaml`（Preset）だけで、PR title 検証 + secretlint + actionlint + zizmor を 1 job に束ねている。他 2 パターンの例に挙げた workflow は v3 まで提供していたもので、パターンの参考として残している。

## Job 命名規則

caller 側の job 名は、どのパターンでも呼び出すファイル名の拡張子を除いた部分と一致させる。`github-actions.yaml` を呼ぶ caller 側 job 名は `github-actions`。

内側 job 名はパターンで変わる。合成された check 名が `<workflow-name> / <role>` という自然な英語に読めるようにする。

| パターン | reusable workflow | 内側 job 名 | 合成 check 名 |
|---|---|---|---|
| 単一ツール | `pull-request.yaml` | そのワークフローが何をするかを動詞的に表す（`validate` / `lint` / `scan` / `build` 等） | `pull-request / validate` |
| Aggregator pattern | `github-actions.yaml` | ツール名（`actionlint` / `zizmor` / `secretlint` / `gitleaks` 等）と、集約用の `required` | `github-actions / actionlint`、`github-actions / zizmor`、`github-actions / required` |
| Aggregator pattern | `secret-scan.yaml` | `secretlint` | `secret-scan / secretlint` |
| Preset | `recommended.yaml` | `required` 1 つだけ。ツールは job 内の step として直列に実行する | `recommended / required` |

### Aggregator pattern

- workflow 名は対象領域または concern を表す（`github-actions` = workflow ファイル対象、`secret-scan` = secret 漏洩検知）。広すぎる概念名（`security` 等）は避ける
- paths-filter 等で条件実行する場合は、集約 job として `required` job を追加し、`if: always()` + `needs.*.result` で集約する。branch protection の required check はこの `<aggregator> / required` を単一エントリポイントとして登録する
- `required` の命名は TypeScript や astral (ruff/uv) の流派に倣う。`success` は誤読の余地があるため避ける

### Preset

- 各チェック step には `if: ${{ !cancelled() }}` を付け、前段の失敗で後段のチェックが skip されないようにする（ジョブが独立していた時と同じ「指摘が一度に全部返る」性質の維持）。`always()` は cancel にも従わなくなるため使わない
- paths-filter 等の条件実行は step の `if` で行う。job 自体は常に完走して結果を報告するため、required check が pending で固まる問題は起きない
- どのツールが落ちたかは job 内の step 名で識別する。合成 check 名では識別できなくなるトレードオフを認識して選ぶ
- ツールの config・バージョンは自動発見や latest に頼らず、flag / env で明示する。ツールのバージョン間で config 発見や既定値の挙動が変わっても caller の結果を安定させるため（例: zizmor の config 自動発見は v1.13.0 と v1.29.0 で変更されている）
- 新しいチェックの追加は preset に step を足す。単体でも呼びたい需要が出た場合のみ、単一ツール workflow を別途切り出す

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
- 内側 job 名を [Job 命名規則](#job-命名規則) の表から決める
- `.github/workflows/_<name>.yaml` に dogfood CI を追加（caller 側 job 名は `<name>` と一致させる）
- `README.md` / `README.ja.md` に使用例を追記（caller 側 job 名も `<name>` で書く）
- conventional commits で `feat:` コミット → Release Please が minor bump した PR を自動起票
