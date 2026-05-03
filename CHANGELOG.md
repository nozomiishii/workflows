# Changelog

## [3.0.2](https://github.com/nozomiishii/workflows/compare/v3.0.1...v3.0.2) (2026-05-03)


### Miscellaneous

* drop systematized rules from claude.md ([#43](https://github.com/nozomiishii/workflows/issues/43)) ([9434a3c](https://github.com/nozomiishii/workflows/commit/9434a3cd73a9648426799e74f135ff15377bc6ac))
* update secretlint/secretlint docker tag to v12.3.1 ([#41](https://github.com/nozomiishii/workflows/issues/41)) ([7367f1b](https://github.com/nozomiishii/workflows/commit/7367f1b894fbf0f8d17b2fc3d73bfd5c48a4c03f))

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
