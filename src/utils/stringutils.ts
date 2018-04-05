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

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uncapitalizeFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}