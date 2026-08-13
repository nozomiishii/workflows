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

### `recommended`

The recommended entry point: runs PR title validation, secret scan, and workflow lint (actionlint + zizmor) in one `ubuntu-slim` job. GitHub Actions bills per job with per-minute rounding, so sub-minute checks split across workflows multiply billable minutes; this preset reports a single required check (`recommended / required`) instead. Each check step runs with `if: ${{ !cancelled() }}`, so one failing check doesn't hide the others' findings.

On `push` / `workflow_dispatch` events only the secret scan runs — PR title validation and workflow lint are gated to `pull_request` events.

The job runs on `ubuntu-slim` by default. Callers can override the runner label with the `runs-on` input (e.g. `with: { runs-on: self-hosted }`). Keep the default GitHub-hosted runner in public repos — GitHub [discourages self-hosted runners on public repositories](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#hardening-for-self-hosted-runners).

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
      contents: read # required by actions/checkout
      pull-requests: write # write: format revert PR titles, read: validate PR titles / list PR files (dorny/paths-filter)
      actions: read # required by zizmor persona audits and referenced_workflows resolution
    uses: nozomiishii/workflows/.github/workflows/recommended.yaml@<sha> # vX.Y.Z
```

## Versioning

Versions follow [Conventional Commits](https://www.conventionalcommits.org/) + [Release Please](https://github.com/googleapis/release-please). Pin callers by SHA with the tag name in a trailing comment so Renovate can suggest upgrades:

```yaml
uses: nozomiishii/workflows/.github/workflows/recommended.yaml@<sha>  # v4.0.0
```

## License

MIT
