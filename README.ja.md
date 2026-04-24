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

### `pull-request`

プルリクエストのタイトルを Conventional Commits 仕様に沿って検証します。type は `feat` / `fix` / `chore` に限定し、subject は小文字 ASCII パターンを強制します。

```yaml
name: Pull Request title
on:
  pull_request:
    types: [opened, edited, synchronize]
permissions:
  pull-requests: read
jobs:
  pull-request:
    uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@v1
```

### `actionlint`

`.github/**/*.yaml` に対して [rhysd/actionlint](https://github.com/rhysd/actionlint) を実行します。`dorny/paths-filter` を使っているため、ジョブは常に Checks ビューに表示されます（branch protection の required checks と互換）。

```yaml
name: Lint GitHub Actions workflows
on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
  pull-requests: read
jobs:
  actionlint:
    uses: nozomiishii/workflows/.github/workflows/actionlint.yaml@v1
```

`pull-requests: read` は `dorny/paths-filter` が `pull_request` イベントで PR の変更ファイル一覧を GitHub API 経由で取得するのに必要です。public repo の場合は public resource 扱いで権限なしでもアクセスできますが、**private repo では caller が明示的に付与しないと "Resource not accessible by integration" で失敗**します。

### `secretlint`

[secretlint/secretlint](https://github.com/secretlint/secretlint) でリポジトリツリーをスキャンし、コミットされたシークレットを検出します。

```yaml
name: Secret scan
on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
jobs:
  secretlint:
    uses: nozomiishii/workflows/.github/workflows/secretlint.yaml@v1
```

### `zizmor`

[zizmorcore/zizmor](https://github.com/zizmorcore/zizmor) で GitHub Actions workflow を静的解析します。この reusable workflow は共通 config を同梱しており、`secrets-outside-env` に対して `OP_SERVICE_ACCOUNT_TOKEN` を allowlist 済みです（根拠: 1Password Service Account token を single entry point として扱い、blast radius の縮小は GitHub Environment ではなく 1Password SA の vault scoping で担う運用方針）。caller 側で `.github/zizmor.yml` / `zizmor.yml` / `.zizmor.yml` のいずれかを置けば、その config が共通 config を上書きします。

```yaml
name: Scan GitHub Actions workflows
on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
jobs:
  zizmor:
    uses: nozomiishii/workflows/.github/workflows/zizmor.yaml@v1
```

## バージョニング

バージョンは [Conventional Commits](https://www.conventionalcommits.org/) と [Release Please](https://github.com/googleapis/release-please) に従います。caller 側は SHA で固定し、末尾コメントにタグ名を残しておくと Renovate がアップグレードを提案してくれます:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v1.0.0
```

## ライセンス

MIT
