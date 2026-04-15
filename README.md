# workflows

Reusable GitHub Actions workflows shared across nozomiishii projects.

## Available workflows

### `pull-request`

Validates pull request titles against the Conventional Commits spec. Restricts types to `feat` / `fix` / `chore` and enforces a lowercase-ASCII subject pattern.

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
jobs:
  actionlint:
    uses: nozomiishii/workflows/.github/workflows/actionlint.yaml@v1
```

### `secretlint`

Scans the repository tree for committed secrets via [secretlint/secretlint](https://github.com/secretlint/secretlint).

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

## Versioning

Versions follow [Conventional Commits](https://www.conventionalcommits.org/) + [Release Please](https://github.com/googleapis/release-please). Pin callers by SHA with the tag name in a trailing comment so Renovate can suggest upgrades:

```yaml
uses: nozomiishii/workflows/.github/workflows/pull-request.yaml@<sha>  # v1.0.0
```

## License

MIT
