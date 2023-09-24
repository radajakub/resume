export const profilePictureShowBorder = true;

export const introComponentDottedSeparator = false;

// compute age in whole years from dateOfBirth
export function computeAge(dateOfBirth: Date): number {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// format dat to dd/mm/yyyy
export function formatDate(date: Date): string {
    const month = date.getMonth();
    return `${date.getDate()}/${(month < 10 ? "0" : "") + month.toString()}/${date.getFullYear()}`;
}

export function computePercentage(curr: number, max: number): number {
    return Math.max(Math.min(Math.ceil(curr * 100 / max), 100), 0);
}

export function openLink(url?: string): void {
    if (url != null) {
        window.open(new URL(url), '_blank');
    }
}

export function computeScrollDotsWidth(count: number, dotWidth: number): number {
    return count * dotWidth + (count - 1) * dotWidth / 2;
}

export function createRange(i: number, j: number): number[] {
    return Array.from({ length: j - i + 1 }, (_, index) => i + index);
}
