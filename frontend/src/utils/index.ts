export const toTitleCase = (text: string): string => {
    return `${text[0].toLocaleUpperCase()}${text.slice(1).toLocaleLowerCase()}`
}


export const formatter = (delimeter = " ") => {
    const UPPERCASE_REGEX = /[A-Z]{1}/
    return (text: string) => {
        let word = toTitleCase(text);

        for (let i = 1; i < text.length; i++) {
            const character = text[i];

            if (!UPPERCASE_REGEX.test(character)) continue;

            const firstPart = word.slice(0, i), secondPart = word.slice(i)

            word = firstPart + delimeter + secondPart

        }
        return word;
    }
}