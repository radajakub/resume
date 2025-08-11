export const profilePictureShowBorder = true;

export const introComponentDottedSeparator = false;

export function openLink(url?: string): void {
  if (url != null) {
    window.open(new URL(url), "_blank");
  }
}

export function computeScrollDotsWidth(count: number, dotWidth: number): number {
  return count * dotWidth + ((count - 1) * dotWidth) / 2;
}

export function createRange(i: number, j: number): number[] {
  return Array.from({ length: j - i + 1 }, (_, index) => i + index);
}

export function formatOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100; // remainder after dividing by 100
  const suffix = v >= 11 && v <= 13 ? "th" : suffixes[v % 10] || "th";
  return `${n}${suffix}`;
}
