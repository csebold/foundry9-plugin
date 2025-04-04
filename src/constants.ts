const f9fontSizeAbsRegex = /&amp;(\^+)(.*?)\1&amp;/g;
const f9fontSizeRelRegex = /&amp;~(\^+)(.*?)\1~&amp;/g;

const f9fontSizeAbsClass = 'upsize';
const f9fontSizeRelClass = 'relsize';

const f9MarkdownAdditions: {
    size: [ string, RegExp ][];
} = {
    size: [
        [ f9fontSizeAbsClass, f9fontSizeAbsRegex ],
        [ f9fontSizeRelClass, f9fontSizeRelRegex ]
    ]
};

const f9BaseClass = 'foundry9';

const stylesheet = `/* Foundry9 Plugin Stylesheet */
.foundry9-plugin-custom-class {
    color: red;
    font-weight: bold;
}

.foundry9.relsize2 {
    font-size: 4rem;
}

.foundry9.relsize3 {
    font-size: 8rem;
}

.foundry9.relsize4 {
    font-size: 16rem;
}

.foundry9.relsize5 {
    font-size: 32rem;
}`;

export {
    f9fontSizeAbsRegex,
    f9fontSizeRelRegex,
    f9fontSizeAbsClass,
    f9fontSizeRelClass,
    f9MarkdownAdditions,
    f9BaseClass,
    stylesheet
};