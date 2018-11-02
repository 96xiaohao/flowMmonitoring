function processStringArray(elements) {
    if (!elements || !elements.length) return 'ARRAY[]::text[]'
    const elementsStrArr = []
    for (let i = 0, j = elements.length; i < j; i++) {
        elementsStrArr.push(`'${elements[i].replace(/\'/ig, '"')}'`)
    }
    // console.log(`ARRAY[${elementsStrArr.join(',')}]`)
    return `ARRAY[${elementsStrArr.join(',')}]`
}

function processTwoDArray(choices) {
    const choiceStrArr = []
    for (let i = 0, j = choices.length; i < j; i++) {
        const choiceArray = choices[i]
        choiceStrArr.push(`ARRAY[${processChoices(choiceArray)}]`)
    }
    return `ARRAY[${choiceStrArr.join(',')}]`
}

function processChoices(choices) {
    const choiceStrArr = []
    for (let m = 0, n = choices.length; m < n; m++) {
        const choice = choices[m]
        choiceStrArr.push(`('${choice.body.replace(/\'/ig, '"')}',${choice.correct})::choice`)
    }
    return choiceStrArr.join(',')
}

function processIcons(icons) {
    const iconStrArr = []
    for (let m = 0, n = icons.length; m < n; m++) {
        const icon = icons[m]
        iconStrArr.push(`('${icon.image.replace(/\'/ig, '"')}','${icon.background}','${icon.type}')::theme_icon`)
    }
    console.log(iconStrArr.join(','))
    return iconStrArr.join(',')
}

function processJsonbArray(objectArr) {
    const jsonbStrArr = []
    for (let i = 0, j = objectArr.length; i < j; i++) {
        const object = objectArr[i]
        jsonbStrArr.push(`'${JSON.stringify(object)}'::jsonb`)
    }
    return `ARRAY[${jsonbStrArr.join(',')}]`
}

function processQueryArray(stringArray) {
    stringArray = stringArray.map(str => `'${str}'`)
    return `(${stringArray.join(',')})`
}

function processEnumStringArray(array, enumType) {
    if (!array || array.length === 0) return `ARRAY[]::${enumType}[]`
    const arrayStrArr = []
    for (let i = 0, j = array.length; i < j; i++) {
        arrayStrArr.push(`('${array[i]}')::${enumType}`)
    }
    return `ARRAY[${arrayStrArr.join(',')}]`
}

function processRangeTimeToObject(rangeTimeStr) {
    const result = {}
    if (rangeTimeStr) {
        rangeTimeStr.replace(/\"(.+?)\"/ig, (origin, dest, index) => {
            if (!result.beginTime) {
                result.beginTime = dest
            } else {
                result.endTime = dest
            }
        })
    }
    return result
}
module.exports = {
    processChoices,
    processTwoDArray,
    processStringArray,
    processJsonbArray,
    processIcons,
    processQueryArray,
    processEnumStringArray,
    processRangeTimeToObject
}