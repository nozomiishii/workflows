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
jobs:
  actionlint:
    uses: nozomiishii/workflows/.github/workflows/actionlint.yaml@v1
```

### `secretlint`

[secretlint/secretlint](https://github.com/secretlint/secretlint) でリポジトリツリーをスキャンし、コミットされたシークレットを検出します。

```yaml
name: Secret scan
on:
  workflow_dispatch:
  push:
    branches: [main]
  pull_request:
jobs:
  scan:
    uses: nozomiishii/workflows/.github/workflows/secretlint.yaml@v1
```

## バージョニング

バージョンは [Conventional Commits](https://www.conventionalcommits.org/) と [Release Please](https://github.com/googleapis/release-please) に従います。caller 側は SHA で固定し、末尾コメントにタグ名を残しておくと Renovate がアップグレードを提案してくれます:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v1.0.0
```

## ライセンス

MIT
