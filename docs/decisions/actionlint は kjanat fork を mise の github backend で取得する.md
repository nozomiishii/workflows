---
status: accepted
date: 2026-09-08
---

# actionlint は kjanat fork を mise の github backend で取得する

## 背景と課題

rhysd/actionlint の release は 2026-03-30 の v1.7.12 で止まっている。GitHub が 2026-06 / 2026-07 に追加した parallel steps と `uses: $/path` の自己 repo 参照に対応する PR は upstream で open のまま。1.7.12 はこれらをエラー扱いするので、caller repo が新構文を使うと `recommended / required` が誤検知で赤くなる。

## 検討した選択肢

### どの actionlint を使うか

| 選択肢 | 評価 |
|---|---|
| upstream 1.7.12 を継続し `-ignore` で新構文エラーを抑制 | syntax-check 全体の抑制になり範囲が広すぎる。AGENTS.md の lint 抑制禁止に反する |
| upstream master をソースビルド | 3 PR は master にも入っていない |
| kjanat/actionlint fork | 3 PR 相当を取り込み済み。CLI はフラグ・出力・設定ファイル形式が同じ。fork 固有の policy チェックは `.github/actionlint.yaml` で opt-in するまで動かない。upstream に無い default-on チェックが matrix 値の YAML tag、`on.schedule` の IANA timezone、ローカル reusable workflow の permissions、composite action の step にあるが、caller 10 repo 48 workflow で両版とも指摘 0。v1.15.1 の release は immutable 設定で attestation 付き |

### binary をどう取得するか

| 選択肢 | 評価 |
|---|---|
| kjanat の download script + `GH_TOKEN` | script は `gh auth status` が通った run だけ attestation を検証し、失敗すると stderr に 1 行出して未検証のまま実行する fail-open。第三者 script の `curl \| bash` が残る |
| `gh release download` + `gh attestation verify` を直書き | 毎回検証でき signer workflow と tag も縛れるが、OS / arch 判定を含め 15 行の自前実装になる |
| mise の `github:kjanat/actionlint` | 既存の Setup mise に 1 行。install 時に GitHub API の digest で checksum、attestation を検証する。検証失敗と検証エラーは install 失敗。API エラーも既定の `provenance_api_failures_fatal = true` で install 失敗。attestation が 1 件も無い release だけ検証を飛ばす。signer workflow は縛らない |
| `npx @kjanat/actionlint` | npx は provenance を検証しない。npx が cwd の package.json を読んで caller の devEngines で落ちる問題を再び抱える |
| `go install` | Go toolchain と毎回のコンパイルで job が伸びる。`actionlint.kjanat.dev` への依存が増える |
| kjanat/actionlint の Docker action | Docker container action は Linux runner 限定。`ubuntu-slim` と macOS self-hosted runner で動かない |

## 決定

kjanat/actionlint 1.15.1 を mise の github backend で取得する。version は Setup mise の `ACTIONLINT_VERSION` に renovate 注釈付きで固定する。

## 結果

### 良くなったこと

- 新構文を誤検知しない
- install 時に checksum + attestation 検証が走り、release workflow を通らない asset 差し替えと経路上の改ざんで install が止まる
- gh / uv / node と同じ mise 管理に揃い、download script の `curl | bash` が消えた

### 引き受けたコスト

- 個人メンテナの fork への依存。upstream の 3 PR は[追跡 issue](https://github.com/nozomiishii/workflows/issues/137)で watch し、merge されて release されたら upstream へ戻すか判断する
- version bump は renovate が automerge で上げる。caller には release 後の renovate PR で届き、新しい default-on チェックで caller の CI が赤くなればその PR は automerge されない。dogfood が lint するのは本 repo の workflow だけなので、caller への影響は caller 側の PR で初めて分かる
- 検証は install 時だけ。GitHub-hosted の mise-action cache hit と self-hosted の `~/.local/share/mise` に残った install は再検証しない
- Setup mise は常に走るので、workflow 変更の無い run でも actionlint を取得する。2 回目以降は上の cache と永続 install で取得しない
- kjanat の release は release ごとに immutable の有無が違う。immutable でない release では tag 付け替えを GitHub 側で防げない
- attestation はソース・ビルド依存の汚染、tag 付け替え + release workflow の再実行、attestation が付かなくなった場合を検出できない

### 保留した論点

signer workflow まで縛る検証は mise に無い。必要になったら `gh attestation verify --signer-workflow` の直書きに切り替える。
