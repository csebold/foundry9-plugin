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

const stylesheet = `/* Optional: Custom styles for your plugin */
.foundry9-plugin-custom-class {
    color: red;
    font-weight: bold;
}

.foundry9.upsize1 {
    font-size: 24px;
}

.foundry9.upsize2 {
    font-size: 36px;
}

.foundry9.upsize3 {
    font-size: 48px;
}

.foundry9.upsize4 {
    font-size: 64px;
}

.foundry9.upsize5 {
    font-size: 80px;
}

.foundry9.upsize1 {
    font-size: 2rem;
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
    stylesheet
};