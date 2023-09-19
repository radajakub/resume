export const profilePictureShowBorder = true;

export const introComponentDottedSeparator = false;

// compute age in whole years from dateOfBirth
export function computeAge(dateOfBirth: Date) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// format dat to dd/mm/yyyy
export function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export function computePercentage(curr: number, max: number) {
    return Math.max(Math.min(Math.ceil(curr * 100 / max), 100), 0);
}

export function openLink(url?: string) {
    if (url != null) {
        window.open(new URL(url), '_blank');
    }
}
