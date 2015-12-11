// LICENSE : MIT
"use strict";
function matchToken(token, expectShape) {
    return Object.keys(expectShape).every(key => {
        const actualValue = token[key];
        const expectedValue = expectShape[key];
        return actualValue === expectedValue;
    })
}
export default function expectTokenStream(tokenStream) {
    let currentTokenPosition = 0;
    const tokenCount = tokenStream.length;
    return (token) => {
        const expectedToken = tokenStream[currentTokenPosition];
        if (matchToken(token, expectedToken)) {
            currentTokenPosition += 1;
        } else {
            // restart
            currentTokenPosition = 0;
        }
        // match
        if (currentTokenPosition === tokenCount) {
            // match -> reset
            currentTokenPosition = 0;
            return true;
        }
        return false;
    }
}