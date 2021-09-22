/**
 * Checks that value is neither null nor an empty string.
 * @param value
 * @return {boolean}
 */
export function isNotEmpty(value: string): boolean {
    return value != null && value !== '';
}

/**
 * Shorten a string to a maximal length and adds a ellipsis.
 * @param text The text to shorten.
 * @param maxLength The maximum length.
 * @returns {string} The original string, or the shortened string in case it is longer the maxLength.
 */
export function shortenText(text: string, maxLength: number) {
    if (text && text.length > maxLength) {
        return `${text.substr(0, maxLength)}\u2026`;
    }
    return text;
}

/**
 * Add value to the left of text till the result is at least size characters long.
 * @param text
 * @param value
 * @param size
 */
export function padLeft(text: string, value: string, size: number) {
    while (text.length < size) {
        text = value + text;
    }
    return text;
}

/**
 * Compares two string and return the result as an integer.
 */
export function compareStrings(s1: string, s2: string): number {
    return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}
