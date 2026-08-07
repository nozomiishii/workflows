import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';

const workflow = readFileSync(
  new URL('../.github/workflows/recommended.yaml', import.meta.url),
  'utf8'
);

const validateStep = workflow.match(
  /      - name: Validate PR title\n(?<body>[\s\S]*?)(?=\n      - name: Test PR title policy)/
)?.groups.body;

assert.ok(validateStep, 'Validate PR title step was not found');

function readScalar(name) {
  const value = validateStep.match(
    new RegExp(`^ {10}${name}: (?<value>.+)$`, 'm')
  )?.groups.value;

  assert.ok(value, `${name} was not found`);
  return value.replace(/^'|'$/g, '');
}

function readList(name) {
  const value = validateStep.match(
    new RegExp(`^ {10}${name}: \\|\\n(?<value>(?: {12}.+\\n?)+)`, 'm')
  )?.groups.value;

  assert.ok(value, `${name} was not found`);
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

const types = readList('types');
const disallowScopes = [readScalar('disallowScopes')];
const subjectPattern = readScalar('subjectPattern');

function accepts(title) {
  const parsed = /^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?: (?<subject>.+)$/.exec(
    title
  );

  if (!parsed || !types.includes(parsed.groups.type)) return false;

  if (
    parsed.groups.scope &&
    disallowScopes.some((pattern) =>
      new RegExp(`^${pattern}$`).test(parsed.groups.scope)
    )
  ) {
    return false;
  }

  const match = parsed.groups.subject.match(new RegExp(subjectPattern));
  return match?.[0].length === parsed.groups.subject.length;
}

test('accepts an allowed type with an English subject', () => {
  assert.equal(accepts('chore: add stress threshold note'), true);
});

test('rejects a Japanese subject', () => {
  assert.equal(
    accepts('chore: ストレスが限界に達する条件を記録する'),
    false
  );
});

test('rejects an unsupported docs type', () => {
  assert.equal(accepts('docs: add stress threshold note'), false);
});
