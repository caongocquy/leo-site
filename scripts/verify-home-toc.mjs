import assert from 'node:assert/strict';
import { getActiveSection, getDocumentProgress } from '../src/utils/homeToc.mjs';

const thresholds = [-400, 700, 1700, 2700];
assert.equal(getActiveSection(thresholds, -999), 0, 'Top-of-page defaults to About');
assert.equal(getActiveSection(thresholds, 100), 0, 'Hero remains active');
assert.equal(getActiveSection(thresholds, 700), 1, 'Expertise activates at its section');
assert.equal(getActiveSection(thresholds, 1980), 2, 'Experience activates independently of Journey');
assert.equal(getActiveSection(thresholds, 3000), 3, 'Projects activates near the end');
assert.equal(getActiveSection([], 100), -1, 'Empty sections are handled safely');
assert.equal(getDocumentProgress(0, 5000, 1000), 0);
assert.equal(getDocumentProgress(2000, 5000, 1000), .5);
assert.equal(getDocumentProgress(5000, 5000, 1000), 1);
assert.equal(getDocumentProgress(-100, 5000, 1000), 0);
assert.equal(getDocumentProgress(0, 900, 1000), 1, 'Short pages have no scrollable range');

console.log('Home TOC: page-vs-section navigation, selection thresholds, and progress bounds verified.');
