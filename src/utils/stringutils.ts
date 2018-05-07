/**
 *
 * Find all **uppercase** characters.
 * Make the uppercase characters lowercase and prepend them with an `_`.
 *
 * In order to handle the first optionally uppercase character the prepended first `_` needs to be removed.
 *
 * @param name Name of the component
 */
export function camelToSnake(name: string) {
    return name.replace(/([A-Z])/g, (x, y) => `_${y.toLowerCase()}`).replace(/^_/, "");
}

export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function uncapitalizeFirstLetter(text: string) {
    return text.charAt(0).toLowerCase() + text.slice(1);
}
