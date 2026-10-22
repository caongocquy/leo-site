/**
 * Select the last section whose heading has crossed the header-aware viewport probe.
 * Sections must be ordered by their appearance in the document.
 */
export function getActiveSection(sectionTops, probe) {
  if (!sectionTops.length) return -1;
  let active = 0;
  for (let index = 0; index < sectionTops.length; index += 1) {
    if (sectionTops[index] <= probe) active = index;
  }
  return active;
}

export function getDocumentProgress(scrollY, documentHeight, viewportHeight) {
  const range = Math.max(0, documentHeight - viewportHeight);
  if (range === 0) return 1;
  return Math.max(0, Math.min(1, scrollY / range));
}
