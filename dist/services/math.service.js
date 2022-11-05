"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = exports.subtract = exports.multiply = exports.add = void 0;
const add = (...args) => {
    const result = args.reduce((cumm, arg) => {
        return +cumm + +arg;
    });
    return result;
};
exports.add = add;
const multiply = (...args) => {
    const result = args.reduce((cumm, arg) => {
        return +cumm * +arg;
    });
    return result;
};
exports.multiply = multiply;
const subtract = (...args) => {
    const result = args.reduce((cumm, arg) => {
        return +cumm - +arg;
    });
    return result;
};
exports.subtract = subtract;
const divide = (...args) => {
    const result = args.reduce((cumm, arg) => {
        return +cumm / +arg;
    });
    return parseFloat(result.toFixed(2));
};
exports.divide = divide;
