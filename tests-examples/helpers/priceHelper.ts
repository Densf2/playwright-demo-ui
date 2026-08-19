export function parsePrice(text: string): number | null {
  const matches = text.match(/\$([\d,]+\.?\d*)/g);
  if (!matches || matches.length === 0) {
    return null;
  }
  const lastMatch = matches[matches.length - 1];
  return parseFloat(lastMatch.replace(/[$,]/g, ""));
}
