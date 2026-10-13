---
status: accepted
date: 2026-10-13
---

# caller の concurrency group を github.event.action で分ける

## 背景と課題

caller は `pull_request` の `edited` でも走る。`concurrency` は `${{ github.workflow }}-${{ github.ref }}` と `cancel-in-progress: true` だった。

Renovate の PR で rebase/retry のチェックを入れると、次の順で automerge が止まった。

- Renovate が rebase して push し、数秒差でチェックを外す本文編集をする
- 同じ commit に `synchronize` と `edited` の run が立ち、同じ group なので片方が cancel される
- どちらが cancel されるかは run が立った順と一致しない。後から立った run が cancel されると、`recommended / required` は CANCELLED と判定され、先に立った run の成功は使われない

2026-10-12 に、チェックを入れた caller repo の Renovate PR 5 件のうち、後から立った run が cancel された 1 件で起きた。cancel された run の再実行で解消した。

## 検討した選択肢

- `edited` を外す: タイトルを直しても検証がやり直されず、次の push まで失敗が残る

  ```yaml
  pull_request:
    types: [opened, reopened, synchronize]
  ```

- `edited` だけ別の group にする: `opened`・`synchronize`・`reopened` は互いに cancel し合えるが、式が読みにくい

  ```yaml
  group: ${{ github.workflow }}-${{ github.ref }}-${{ github.event.action == 'edited' && 'edited' || 'code' }}
  ```

- action ごとに group を分ける: 読みやすい。`opened`・`synchronize`・`reopened` も別の group になるが、必須チェックの判定には影響しない

  ```yaml
  group: ${{ github.workflow }}-${{ github.ref }}-${{ github.event.action }}
  ```

- 変更せず、PR 本文のチェックを使わない運用にする: 手作業の注意に頼る

## 決定

caller の `concurrency.group` に `${{ github.event.action }}` を足す。README の caller テンプレートと、各 repo の `_recommended.yaml` をこの形に揃える。

## 結果

### 良くなったこと

- 同じ commit の `synchronize` と `edited` の run が CANCELLED で残らない

### 引き受けたコスト

- PR を作った直後に push すると、古い commit の `opened` の run が cancel されずに最後まで走る
- 編集と push が重なったとき、同じ commit で recommended が 2 回最後まで走る

### 保留した論点

同じ commit で `edited` が数秒差で 2 回起きると、`edited` の group の中で同じ問題が起こりうる。起きたら cancel された run を再実行する。
