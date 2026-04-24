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
    uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@v1
```

### `actionlint`

Runs [rhysd/actionlint](https://github.com/rhysd/actionlint) against `.github/**/*.yaml`. Uses `dorny/paths-filter` so the job always appears in the Checks view (compatible with branch protection required checks).

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

`pull-requests: read` is required because `dorny/paths-filter` uses the GitHub API to list PR files on `pull_request` events. Public repositories can access that endpoint without the scope (GitHub treats public resources as unauthenticated), but **private repositories will fail with "Resource not accessible by integration" unless the caller grants it**.

### `secretlint`

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
  secretlint:
    uses: nozomiishii/workflows/.github/workflows/secretlint.yaml@v1
```

### `zizmor`

Audits GitHub Actions workflows with [zizmorcore/zizmor](https://github.com/zizmorcore/zizmor). The reusable workflow ships with a shared config that allowlists `OP_SERVICE_ACCOUNT_TOKEN` for `secrets-outside-env` (rationale: 1Password Service Account tokens are managed as single entry points with blast-radius reduction delegated to the 1Password SA vault scoping, not GitHub Environments). Callers that drop their own `.github/zizmor.yml` / `zizmor.yml` / `.zizmor.yml` override the shared config.

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

## Versioning

Versions follow [Conventional Commits](https://www.conventionalcommits.org/) + [Release Please](https://github.com/googleapis/release-please). Pin callers by SHA with the tag name in a trailing comment so Renovate can suggest upgrades:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v1.0.0
```

## License

MIT
