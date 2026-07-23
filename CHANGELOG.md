# Changelog

## [3.3.3](https://github.com/nozomiishii/workflows/compare/v3.3.2...v3.3.3) (2026-07-23)


### Miscellaneous

* update actions/checkout action to v7.0.1 ([#81](https://github.com/nozomiishii/workflows/issues/81)) ([e1dfc44](https://github.com/nozomiishii/workflows/commit/e1dfc446a99c947b4d746d9349c9bfe96f9f5ab3))

## [3.3.2](https://github.com/nozomiishii/workflows/compare/v3.3.1...v3.3.2) (2026-07-18)


### Miscellaneous

* add .envrc for worktree setup ([#76](https://github.com/nozomiishii/workflows/issues/76)) ([b62d067](https://github.com/nozomiishii/workflows/commit/b62d067c6d2a0eb04983a99750742e9bf429cbd9))
* move workflow authoring guide to docs ([#77](https://github.com/nozomiishii/workflows/issues/77)) ([9701872](https://github.com/nozomiishii/workflows/commit/97018721727ab00263fa456c1f7e55952e75ee14))
* remove envrc setup boilerplate ([#79](https://github.com/nozomiishii/workflows/issues/79)) ([87f0e24](https://github.com/nozomiishii/workflows/commit/87f0e24146f553a9fc15dde14de5ae4002e8ff05))
* update 1password/op docker tag to v2.35.0 ([#78](https://github.com/nozomiishii/workflows/issues/78)) ([67391f3](https://github.com/nozomiishii/workflows/commit/67391f3150150abe40184f1629d490afd7c16192))
* update dorny/paths-filter action to v4.0.2 ([#74](https://github.com/nozomiishii/workflows/issues/74)) ([9f29b6b](https://github.com/nozomiishii/workflows/commit/9f29b6b542e3d7ab27349277af88ea5f7da08e12))
* update zizmorcore/zizmor-action action to v0.6.0 ([#80](https://github.com/nozomiishii/workflows/issues/80)) ([b4d40aa](https://github.com/nozomiishii/workflows/commit/b4d40aae81f6483022adcfc457255ae385b93003))

## [3.3.1](https://github.com/nozomiishii/workflows/compare/v3.3.0...v3.3.1) (2026-07-01)


### Bug Fixes

* use ghcr.io for secretlint Docker image to avoid Docker Hub timeouts ([#72](https://github.com/nozomiishii/workflows/issues/72)) ([0eb1fd6](https://github.com/nozomiishii/workflows/commit/0eb1fd6c2f2e5a31e6864c7bd1c91568c52d1cf1))

## [3.3.0](https://github.com/nozomiishii/workflows/compare/v3.2.0...v3.3.0) (2026-06-30)


### Features

* auto-format GitHub revert PR titles to conventional commits ([#71](https://github.com/nozomiishii/workflows/issues/71)) ([b449bb1](https://github.com/nozomiishii/workflows/commit/b449bb17596e1dfc209071eda7ac47dd52528bc5))


### Bug Fixes

* use ubuntu-slim for required jobs ([#69](https://github.com/nozomiishii/workflows/issues/69)) ([23e76d6](https://github.com/nozomiishii/workflows/commit/23e76d6fc69d15fa2e39f2c88cadcaa7c9f5e5ad))


### Miscellaneous

* rename paths-filter output from workflows to src ([#67](https://github.com/nozomiishii/workflows/issues/67)) ([46ba784](https://github.com/nozomiishii/workflows/commit/46ba784fc11ff18481e222a926bc67a87b41e609))
* update zizmorcore/zizmor-action action to v0.5.7 ([#70](https://github.com/nozomiishii/workflows/issues/70)) ([7a98cd9](https://github.com/nozomiishii/workflows/commit/7a98cd9a388b5365989b5a9ae7a5cf21b9ed6487))

## [3.2.0](https://github.com/nozomiishii/workflows/compare/v3.1.2...v3.2.0) (2026-06-21)


### Features

* add required summary jobs to pull-request and secret-scan workflows ([#65](https://github.com/nozomiishii/workflows/issues/65)) ([8fb9c86](https://github.com/nozomiishii/workflows/commit/8fb9c866d0dcc53e83874d18f3de521b502510a0))


### Bug Fixes

* grant workflows permission to release app token for non-head releases ([#57](https://github.com/nozomiishii/workflows/issues/57)) ([7c205cb](https://github.com/nozomiishii/workflows/commit/7c205cb74199c7cc2c5eb06e10acfac769ce09ff))


### Miscellaneous

* adopt AGENTS.md and .hooks/ ([#62](https://github.com/nozomiishii/workflows/issues/62)) ([9d2cae2](https://github.com/nozomiishii/workflows/commit/9d2cae21c572938bcae87ffbc0cc4d8428f3df6d))
* align CLAUDE.md with writing guidelines ([#61](https://github.com/nozomiishii/workflows/issues/61)) ([2704872](https://github.com/nozomiishii/workflows/commit/27048725d0e4065585edfe1099ec308e6b4b68cf))
* update 1password/load-secrets-action action to v4.0.1 ([#63](https://github.com/nozomiishii/workflows/issues/63)) ([38cb748](https://github.com/nozomiishii/workflows/commit/38cb74859d634a134f3669d688fa127d1bfa9f35))
* update 1password/op docker tag to v2.34.1 ([#64](https://github.com/nozomiishii/workflows/issues/64)) ([7ae06ea](https://github.com/nozomiishii/workflows/commit/7ae06eaff2b569f6658c237f6aa499ab5ab69879))
* update actions/checkout action to v6.0.3 ([#60](https://github.com/nozomiishii/workflows/issues/60)) ([a9ffb3b](https://github.com/nozomiishii/workflows/commit/a9ffb3bff428e0ab8b33bfd06008e81fa40db1f7))
* update actions/checkout action to v7 ([#66](https://github.com/nozomiishii/workflows/issues/66)) ([8c152dd](https://github.com/nozomiishii/workflows/commit/8c152dd3567c1634f735780a01a4fd667874123c))

## [3.1.2](https://github.com/nozomiishii/workflows/compare/v3.1.1...v3.1.2) (2026-05-20)


### Bug Fixes

* drop issues permission from release app token ([#55](https://github.com/nozomiishii/workflows/issues/55)) ([a8cdc25](https://github.com/nozomiishii/workflows/commit/a8cdc25eba7cc4e265d509edb26c5c485082ce64))


### Miscellaneous

* add startup hook for session sync ([#49](https://github.com/nozomiishii/workflows/issues/49)) ([830702b](https://github.com/nozomiishii/workflows/commit/830702b5b6f8326c0144118aa9d5374837d5bf2a))
* update actions/create-github-app-token action to v3.2.0 ([#51](https://github.com/nozomiishii/workflows/issues/51)) ([72a6bb7](https://github.com/nozomiishii/workflows/commit/72a6bb76a5019b080cce71f4fdbccc561909f729))
* update secretlint/secretlint docker tag to v13.0.2 ([#53](https://github.com/nozomiishii/workflows/issues/53)) ([61d576a](https://github.com/nozomiishii/workflows/commit/61d576a0d289149e844f3865c5366f4b399bca08))
* update zizmorcore/zizmor-action action to v0.5.5 ([#52](https://github.com/nozomiishii/workflows/issues/52)) ([54f0f3b](https://github.com/nozomiishii/workflows/commit/54f0f3b61c47854fa10bf831d24cdcf9f8feafee))
* update zizmorcore/zizmor-action action to v0.5.6 ([#54](https://github.com/nozomiishii/workflows/issues/54)) ([40094f6](https://github.com/nozomiishii/workflows/commit/40094f6bff788aea5ef0f907c643a2f87f91ee6b))

## [3.1.1](https://github.com/nozomiishii/workflows/compare/v3.1.0...v3.1.1) (2026-05-10)


### Miscellaneous

* migrate create-github-app-token input from app-id to client-id ([#47](https://github.com/nozomiishii/workflows/issues/47)) ([3d6298a](https://github.com/nozomiishii/workflows/commit/3d6298aad45766b8babff501c05162b31675f2a1))

## [3.1.0](https://github.com/nozomiishii/workflows/compare/v3.0.2...v3.1.0) (2026-05-09)


### Features

* forbid PR title scopes by default with caller opt-in input ([#45](https://github.com/nozomiishii/workflows/issues/45)) ([556698a](https://github.com/nozomiishii/workflows/commit/556698a81923bbcc81163c7703a5696962941009))

## [3.0.2](https://github.com/nozomiishii/workflows/compare/v3.0.1...v3.0.2) (2026-05-07)


### Miscellaneous

* drop systematized rules from claude.md ([#43](https://github.com/nozomiishii/workflows/issues/43)) ([9434a3c](https://github.com/nozomiishii/workflows/commit/9434a3cd73a9648426799e74f135ff15377bc6ac))
* update secretlint/secretlint docker tag to v12.3.1 ([#41](https://github.com/nozomiishii/workflows/issues/41)) ([7367f1b](https://github.com/nozomiishii/workflows/commit/7367f1b894fbf0f8d17b2fc3d73bfd5c48a4c03f))
* update secretlint/secretlint docker tag to v13 ([#44](https://github.com/nozomiishii/workflows/issues/44)) ([bbd07af](https://github.com/nozomiishii/workflows/commit/bbd07af48bf3a58393f81d554b8f45afe2f131a9))

## [3.0.1](https://github.com/nozomiishii/workflows/compare/v3.0.0...v3.0.1) (2026-04-26)


### Bug Fixes

* **ci:** scope github-actions trigger to pull_request only ([#38](https://github.com/nozomiishii/workflows/issues/38)) ([d43bbba](https://github.com/nozomiishii/workflows/commit/d43bbba61ee6cb1c4b4a7f5699ae03c35a916df7))


### Miscellaneous

* add CODEOWNERS file ([#36](https://github.com/nozomiishii/workflows/issues/36)) ([19b136d](https://github.com/nozomiishii/workflows/commit/19b136d5931167017c990edbae05802bf725449b))
* update googleapis/release-please-action action to v5 ([#40](https://github.com/nozomiishii/workflows/issues/40)) ([83db856](https://github.com/nozomiishii/workflows/commit/83db856260cc9414b7413316f4f3efafa595790e))
* update secretlint/secretlint docker tag to v12.2.0 ([#39](https://github.com/nozomiishii/workflows/issues/39)) ([979530c](https://github.com/nozomiishii/workflows/commit/979530c01d02883fe0070225d5395c22b8b14b85))

## [3.0.0](https://github.com/nozomiishii/workflows/compare/v2.0.0...v3.0.0) (2026-04-24)


### ⚠ BREAKING CHANGES

* v1 workflow files (`actionlint.yaml`, `secretlint.yaml`) are removed. Callers that have not migrated to the v2 names must do so before updating their pin past this commit.

### Features

* inject shared zizmor default into callers ([#33](https://github.com/nozomiishii/workflows/issues/33)) ([ef67c52](https://github.com/nozomiishii/workflows/commit/ef67c521a695453ea39559a8ab26e45e1297be11))
* remove v1 reusable workflows and their dogfood callers ([#34](https://github.com/nozomiishii/workflows/issues/34)) ([4114f39](https://github.com/nozomiishii/workflows/commit/4114f39af968607bdcef88b48d29605df89728fd))

## [2.0.0](https://github.com/nozomiishii/workflows/compare/v1.1.1...v2.0.0) (2026-04-24)


### ⚠ BREAKING CHANGES

* Introduces v2 reusable workflow structure. Callers migrating to v2 must update branch-protection required checks to `github-actions / success` (single aggregator entry) instead of the per-tool check names from v1.

### Features

* add github-actions and secret-scan reusable workflows ([#22](https://github.com/nozomiishii/workflows/issues/22)) ([d17c8d3](https://github.com/nozomiishii/workflows/commit/d17c8d3c39dd06b463addfa612e8b9317380f469))


### Bug Fixes

* grant pull-requests read permission to actionlint dogfood caller ([#14](https://github.com/nozomiishii/workflows/issues/14)) ([4fda2a9](https://github.com/nozomiishii/workflows/commit/4fda2a97978388f26d1755627a5af9c0fbf6d6db))


### Miscellaneous

* add renovate config extending shared preset ([#11](https://github.com/nozomiishii/workflows/issues/11)) ([6baca80](https://github.com/nozomiishii/workflows/commit/6baca800e34fc2c31156171e3688b25d4908c9ab))
* introduce dunder prefix for repo-own workflows ([#23](https://github.com/nozomiishii/workflows/issues/23)) ([810377a](https://github.com/nozomiishii/workflows/commit/810377ab5812530788960747386d4ae33a06fdc4))
* remove unused gitleaks comment from secretlint workflow ([#13](https://github.com/nozomiishii/workflows/issues/13)) ([ba339dc](https://github.com/nozomiishii/workflows/commit/ba339dc66382f3183370e52fc97e7ef24929265f))
* update actions/checkout action to v6.0.2 ([#25](https://github.com/nozomiishii/workflows/issues/25)) ([f79949c](https://github.com/nozomiishii/workflows/commit/f79949cea55a8659284f9a41b635066b4fc2f93e))
* update actions/checkout action to v6.0.2 ([#30](https://github.com/nozomiishii/workflows/issues/30)) ([6f42eb9](https://github.com/nozomiishii/workflows/commit/6f42eb965aee4f867b2b0361e7dfc6360d5b534d))
* update actions/create-github-app-token action to v3 ([#17](https://github.com/nozomiishii/workflows/issues/17)) ([53fe44b](https://github.com/nozomiishii/workflows/commit/53fe44b6838092ffc500dc4b97a7535abaf6ea01))
* update actions/create-github-app-token action to v3.1.1 ([#27](https://github.com/nozomiishii/workflows/issues/27)) ([d172ee8](https://github.com/nozomiishii/workflows/commit/d172ee85872fc363c3e75645c69aea8574b27772))
* update amannn/action-semantic-pull-request action to v6.1.1 ([#28](https://github.com/nozomiishii/workflows/issues/28)) ([dfeff77](https://github.com/nozomiishii/workflows/commit/dfeff776c5726df7cc3a9ee34445c78c47341774))
* update dorny/paths-filter action to v4.0.1 ([#26](https://github.com/nozomiishii/workflows/issues/26)) ([68c63c3](https://github.com/nozomiishii/workflows/commit/68c63c35a07eeb4f10dc564efc9ec862bdd8899b))
* update dorny/paths-filter action to v4.0.1 ([#31](https://github.com/nozomiishii/workflows/issues/31)) ([404c9d8](https://github.com/nozomiishii/workflows/commit/404c9d898b429272a6a005e90677f32d9b3cff69))
* update googleapis/release-please-action action to v4.4.1 ([#29](https://github.com/nozomiishii/workflows/issues/29)) ([8dce635](https://github.com/nozomiishii/workflows/commit/8dce6359723e0b23620c9153da865838191838e9))
* update googleapis/release-please-action digest to 5c625bf ([#15](https://github.com/nozomiishii/workflows/issues/15)) ([ccd44d3](https://github.com/nozomiishii/workflows/commit/ccd44d3eb31be700fee5b4da5fd5c2f979b66c21))
* update secretlint/secretlint docker tag to v12 ([#18](https://github.com/nozomiishii/workflows/issues/18)) ([cc60863](https://github.com/nozomiishii/workflows/commit/cc60863904e5018c6a29d1c3d24308e9f15261d8))
* update secretlint/secretlint docker tag to v12 ([#32](https://github.com/nozomiishii/workflows/issues/32)) ([90e887a](https://github.com/nozomiishii/workflows/commit/90e887a743f0c1a1b90ff04327a92e7181670626))
* update secretlint/secretlint docker tag to v12.2.0 ([#20](https://github.com/nozomiishii/workflows/issues/20)) ([56b5da9](https://github.com/nozomiishii/workflows/commit/56b5da9893de2b63ec1876133164c12fc03f16cf))

## [1.1.1](https://github.com/nozomiishii/workflows/compare/v1.1.0...v1.1.1) (2026-04-17)


### Bug Fixes

* add pull-requests read permission to actionlint reusable workflow ([#8](https://github.com/nozomiishii/workflows/issues/8)) ([396839c](https://github.com/nozomiishii/workflows/commit/396839c28d0585ce07dd07f6e9f7e619cd248b99))

## [1.1.0](https://github.com/nozomiishii/workflows/compare/v1.0.0...v1.1.0) (2026-04-16)


### Features

* standardize reusable workflow job names ([#7](https://github.com/nozomiishii/workflows/issues/7)) ([3bed8fb](https://github.com/nozomiishii/workflows/commit/3bed8fbbaef82e2824e9a197016bf1f91dde5790))


### Miscellaneous

* add Japanese README translation ([#6](https://github.com/nozomiishii/workflows/issues/6)) ([b7ea192](https://github.com/nozomiishii/workflows/commit/b7ea1923e1ba054a61e6359b5ca07aa4d620537e))
* extend gitignore with logs and claude local files ([#4](https://github.com/nozomiishii/workflows/issues/4)) ([2bf72de](https://github.com/nozomiishii/workflows/commit/2bf72de09d335fa2d60cfa7aae8f458be2e8293b))

## 1.0.0 (2026-04-16)


### Features

* bootstrap with pr-title, actionlint, secretlint reusable workflows ([#2](https://github.com/nozomiishii/workflows/issues/2)) ([67f3dec](https://github.com/nozomiishii/workflows/commit/67f3dec13e90eddf11e8cd59769338a1fb7666b4))


### Miscellaneous

* initial commit ([cee945e](https://github.com/nozomiishii/workflows/commit/cee945e86bbd863442a82dbd8e842836c9fe2a6c))
