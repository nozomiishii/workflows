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
    uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@v2
```

### `github-actions`

[rhysd/actionlint](https://github.com/rhysd/actionlint) と [zizmorcore/zizmor](https://github.com/zizmorcore/zizmor) で GitHub Actions の workflow を静的解析します。`dorny/paths-filter` で `.github/**/*.yaml` の変更時のみ lint を走らせ、aggregator の `required` job は常に結果を返すため、branch protection の required check として `github-actions / required` を 1 つ登録するだけで済みます。

最小構成 — findings は Actions の job log に出力されます。どのプランでも動作（Free / Pro の private repo 含む）:

```yaml
name: GitHub Actions
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
  actions: read
jobs:
  github-actions:
    uses: nozomiishii/workflows/.github/workflows/github-actions.yaml@v2
```

Code Scanning と連携する構成 — zizmor の findings を SARIF として Security タブ / PR の inline annotation に表示します。[GitHub Advanced Security](https://github.com/security/plans) が必要で、public repo では無料、private repo では Team / Enterprise plan + Code Security add-on が必要（Free / Pro plan の private repo では利用不可）:

```yaml
permissions:
  contents: read
  pull-requests: read
  security-events: write
  actions: read
jobs:
  github-actions:
    uses: nozomiishii/workflows/.github/workflows/github-actions.yaml@v2
    with:
      advanced-security: true
```

`pull-requests: read` は `dorny/paths-filter` が `pull_request` イベントで PR の変更ファイル一覧を GitHub API 経由で取得するのに必要です。public repo の場合は public resource 扱いで権限なしでもアクセスできますが、**private repo では caller が明示的に付与しないと "Resource not accessible by integration" で失敗**します。

### `secret-scan`

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
  secret-scan:
    uses: nozomiishii/workflows/.github/workflows/secret-scan.yaml@v2
```

## バージョニング

バージョンは [Conventional Commits](https://www.conventionalcommits.org/) と [Release Please](https://github.com/googleapis/release-please) に従います。caller 側は SHA で固定し、末尾コメントにタグ名を残しておくと Renovate がアップグレードを提案してくれます:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v2.0.0
```

## ライセンス

MIT
