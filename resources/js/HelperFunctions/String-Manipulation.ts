export function stringAsEllipses(str) {
    if (str.length > 15) {
        return str.substring(0, 5) + '...' + str.substring(str.length-6, str.length);
    }
    return str;
}
