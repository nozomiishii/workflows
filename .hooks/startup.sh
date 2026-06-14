#!/usr/bin/env bash
set -euo pipefail

# Codex は CODEX_PROJECT_DIR 相当を持たず session cwd で hook を回すため、
# worktree のサブディレクトリで起動された場合 pnpm install が package.json を見失う。
# 両ツールから同じ起点で動かすために repo root へ移動する。
cd "$(git rev-parse --show-toplevel)"
# セッション開始時に worktree を整える（可能なら origin/main 取り込み）。

git fetch origin --quiet

# 既存の commit や未保存変更を壊さない範囲で HEAD を origin/main まで進める。
if git merge-base --is-ancestor HEAD origin/main 2>/dev/null; then
  # merge commit を作らず HEAD を進めるだけ → linear history を維持
  git merge --ff-only origin/main --quiet
fi
