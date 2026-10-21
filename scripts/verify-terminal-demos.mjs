import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const projects = {
  'code-atlas': 'npm install -g @showdar2112/code-atlas',
  'showdar-router': 'npm install -g showdar-router',
  'showdar-skills': 'npm install -g showdar-skills',
  'react-native-otp-input-kit': 'npm install @leo-showdar/react-native-otp-input-kit',
  'react-native-splash-view': 'npm install @leo-showdar/react-native-splash-view',
};

for (const [slug, command] of Object.entries(projects)) {
  const page = readFileSync(`dist/projects/${slug}/index.html`, 'utf8');
  assert.ok(page.includes('data-terminal-demo'), `${slug} missing terminal demo`);
  assert.ok(page.includes('data-demo-replay'), `${slug} missing Replay control`);
  assert.ok(page.includes('data-demo-copy'), `${slug} missing Copy control`);
  assert.ok(page.includes('data-demo-panel'), `${slug} missing project preview`);
  assert.ok(page.includes(command), `${slug} missing actual install command`);
  assert.ok(page.includes('no commands are executed'), `${slug} missing honest simulation disclosure`);
}
console.log('Project terminal demos: markup and all 5 verified commands passed.');
