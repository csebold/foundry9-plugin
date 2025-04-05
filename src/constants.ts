const f9fontSizeAbsRegex = /&amp;(\^+)(.*?)\1&amp;/g;
const f9fontSizeRelRegex = /&amp;~(\^+)(.*?)\1~&amp;/g;

const f9fontSizeAbsClass = 'upsize';
const f9fontSizeRelClass = 'relsize';

const f9HighlightBlockRegex = /&amp;\((.*?)\)\((.*?)\)&amp;/g;
const f9HighlightBlockClass = 'hl';

const f9MarkdownAdditions: {
    size: [ string, RegExp ][];
    blocks: [ string, RegExp ][];
} = {
    size: [
        [ f9fontSizeAbsClass, f9fontSizeAbsRegex ],
        [ f9fontSizeRelClass, f9fontSizeRelRegex ]
    ],
    blocks: [
        [ f9HighlightBlockClass, f9HighlightBlockRegex ],
    ]
};

const f9BaseClass = 'foundry9';

const stylesheet = `/* Foundry9 Plugin Stylesheet */
`;

export {
    f9fontSizeAbsRegex,
    f9fontSizeRelRegex,
    f9fontSizeAbsClass,
    f9fontSizeRelClass,
    f9MarkdownAdditions,
    f9BaseClass,
    stylesheet
};