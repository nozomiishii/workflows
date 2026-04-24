# workflows

English | [日本語](README.ja.md)

<!-- Main Image -->
<br>
<div align="center">
  <img src="https://media.giphy.com/media/mvWl6BhmEOt8v4qpMH/giphy.gif" alt="flow" width="480" />
</div>
<div align="right">
  <small>via GIPHY</small>
</div>
<br>


Reusable GitHub Actions workflows shared across nozomiishii projects.

## Available workflows

### `pull-request`

Validates pull request titles against the Conventional Commits spec. Restricts types to `feat` / `fix` / `chore` and enforces a lowercase-ASCII subject pattern.

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

Audits GitHub Actions workflows with [rhysd/actionlint](https://github.com/rhysd/actionlint) and [zizmorcore/zizmor](https://github.com/zizmorcore/zizmor). `dorny/paths-filter` gates the lint jobs on changes to `.github/**/*.yaml`; an aggregator `required` job always reports, making it safe to register as a single branch-protection required check (`github-actions / required`).

zizmor runs with `persona: auditor` and fails the job on findings of any severity (informational / low / medium / high). Any finding must be either fixed or explicitly suppressed via a [`.github/zizmor.yaml`](https://docs.zizmor.sh/configuration/) config or an inline `# zizmor: ignore[<rule>]` comment, so warnings can't silently pile up.

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

`pull-requests: read` is required because `dorny/paths-filter` uses the GitHub API to list PR files on `pull_request` events. Public repositories can access that endpoint without the scope, but **private repositories will fail with "Resource not accessible by integration" unless the caller grants it**. `actions: read` is required by zizmor's auditor persona to inspect referenced actions metadata.

### `secret-scan`

Scans the repository tree for committed secrets via [secretlint/secretlint](https://github.com/secretlint/secretlint).

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

## Versioning

Versions follow [Conventional Commits](https://www.conventionalcommits.org/) + [Release Please](https://github.com/googleapis/release-please). Pin callers by SHA with the tag name in a trailing comment so Renovate can suggest upgrades:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v2.0.0
```

## License

MIT
