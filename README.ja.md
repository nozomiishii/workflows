# workflows

[English](README.md) | 日本語

<!-- Main Image -->
<br>
<div align="center">
  <img src="https://media.giphy.com/media/mvWl6BhmEOt8v4qpMH/giphy.gif" alt="flow" width="480" />
</div>
<div align="right">
  <small>via GIPHY</small>
</div>
<br>


nozomiishii の各プロジェクトで共有する、再利用可能な GitHub Actions workflow 集です。

## 利用可能な workflow

### `recommended`

推奨のエントリポイント: PR title 検証・secret scan・workflow lint(actionlint + zizmor)を1つの `ubuntu-slim` ジョブで実行します。GitHub Actions の課金はジョブごとに分単位で切り上げられるため、1分未満のチェックを workflow ごとに分けると課金だけが積み上がります。このプリセットは required check を `recommended / required` の1つに集約します。各チェック step は `if: ${{ !cancelled() }}` 付きで、1つのチェックが失敗しても他のチェックの指摘は隠れません。

PR title 検証は [`@nozomiishii/commitlint-config`](https://github.com/nozomiishii/configs/tree/main/packages/commitlint-config) の同梱 config でタイトルを lint します。workflow 側が同 package の `nozo-commitlint` CLI を version 固定で install し、`--config` を渡さずに実行するため、caller 側に `commitlint.config.ts` も `package.json` も `node_modules` も要りません(workflow ファイルしか無い repo でも通ります)。ルールの正本は 1 箇所で、ルール変更は caller が workflow ref を上げた時点で反映されます。

`push` / `workflow_dispatch` イベントでは secret scan だけが走ります — PR title 検証と workflow lint は `pull_request` イベント限定です。

ジョブはデフォルトで `ubuntu-slim` で実行されます。`runs-on` input で runner label を変更できます(例: `with: { runs-on: self-hosted }`)。public repo では GitHub が [self-hosted runner の使用を非推奨としている](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#hardening-for-self-hosted-runners)ため、デフォルトの GitHub-hosted runner を維持してください。

```yaml
name: recommended
on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:
    types: [opened, edited, reopened, synchronize]
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions: {}
jobs:
  recommended:
    permissions:
      contents: read # actions/checkout に必要
      pull-requests: write # write: revert PR タイトルの自動変換, read: PR タイトルの取得 / PR ファイル一覧の取得 (dorny/paths-filter)
      actions: read # zizmor persona audits と referenced_workflows の解決に必要
    uses: nozomiishii/workflows/.github/workflows/recommended.yaml@<sha> # vX.Y.Z
```

## バージョニング

バージョンは [Conventional Commits](https://www.conventionalcommits.org/) と [Release Please](https://github.com/googleapis/release-please) に従います。caller 側は SHA で固定し、末尾コメントにタグ名を残しておくと Renovate がアップグレードを提案してくれます:

```yaml
uses: nozomiishii/workflows/.github/workflows/recommended.yaml@<sha>  # v4.0.0
```

## ライセンス

MIT
