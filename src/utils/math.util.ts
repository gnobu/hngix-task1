export const add = (...args: (string|number)[]) => {
    const result = <number>args.reduce((cumm, arg) => {
        return +cumm + +arg
    })
    return result
}

export const multiply = (...args: (string|number)[]) => {
    const result = <number>args.reduce((cumm, arg) => {
        return +cumm * +arg
    })
    return result
}

export const subtract = (...args: (string|number)[]) => {
    const result = <number>args.reduce((cumm, arg) => {
        return +cumm - +arg
    })
    return result
}

export const divide = (...args: (string|number)[]) => {
    const result = <number>args.reduce((cumm, arg) => {
        return +cumm / +arg
    })
    return parseFloat(result.toFixed(2))
}