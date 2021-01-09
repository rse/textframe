/*
**  TextFrame -- Re-Frame Multi-Line Text
**  Copyright (c) 2017-2021 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  internal helper function  */
const objectAssign = (to, ...source) => {
    for (let i = 0; i < source.length; i++)
        for (const key in source[i])
            if (hasOwnProperty.call(source[i], key))
                to[key] = source[i][key]
    return to
}

/*  API function: convenience wrapper  */
const textframe = (...args) => {
    /*  support "factory method" usage  */
    if (   args.length === 1
        && typeof args[0] === "object"
        && !(args[0] instanceof Array)
        && args[0] !== null           )
        return textframe.make(args[0])

    /*  support "tagged template literal" usage  */
    else if (args.length >= 1
        && typeof args[0] === "object"
        && args[0] instanceof Array   ) {
        const k = args[0].length - 1
        const options = objectAssign({}, ...args.slice(1 + k))
        return textframe.raw(String.raw({ raw: args[0] }, ...args.slice(1, 1 + k)), options)
    }

    /*  support regular usage  */
    else if (args.length >= 1) {
        const options = objectAssign({}, ...args.slice(1))
        return textframe.raw(args[0], options)
    }

    /*  anything error is an error  */
    else
        throw new Error("invalid arguments")
}

/*  API function: raw functionality  */
textframe.raw = (text, options = {}) => {
    /*  provide default option values  */
    options = objectAssign({
        tabsize:  8,
        indent:   0,
        leading:  0,
        trailing: 0
    }, options)

    /*  sanity check input  */
    if (typeof text !== "string")
        throw new Error("invalid input text (expected type \"string\")")

    /*  determine newline character sequence  */
    const newline = text.indexOf("\r\n") >= 0 ? "\r\n" : "\n"

    /*  prerequisite: expand all leading TAB characters  */
    text = text.split(newline).map((line) => {
        const match = line.match(/^([ \t]*)(\S.*|)$/)
        if (match !== null) {
            let [ , prefix, content ] = match
            let offset = 0
            prefix = prefix.replace(/\t/g, (_, idx) => {
                const max = options.tabsize - (idx + offset) % options.tabsize
                offset += max - 1
                return " ".repeat(options.tabsize).slice(0, max)
            })
            line = prefix + content
        }
        return line
    }).join(newline)

    /*  mandatory: remove all trailing whitespace  */
    text = text.replace(/[ \t]+$/gm, "")

    /*  mandatory: reverse-indent (textframe) the text  */
    const matches = text.match(/^ *(?=\S)/gm)
    if (matches !== null) {
        const indents = matches.map((match) => match.length)
        const indent = Math.min.apply(Math, indents)
        if (indent > 0) {
            const re = new RegExp(`^ {${indent}}`, "gm")
            text = text.replace(re, "")
        }
    }

    /*  optionally: indent the text (again)  */
    if (options.indent > 0) {
        const prefix = " ".repeat(options.indent)
        text = text.replace(/^(?!\s*$)/mg, prefix)
    }

    /*  mandatory: remove leading blank lines  */
    text = text.replace(/^(?: *\r?\n)+/, "")

    /*  optionally: add leading blank lines  */
    if (options.leading > 0)
        text = newline.repeat(options.leading) + text

    /*  mandatory: remove trailing blank lines  */
    text = text.replace(/(?: *\r?\n)+$/, "")
    text = text.replace(/([^\n])$/, "$1" + newline)

    /*  optionally: add trailing blank lines  */
    if (options.trailing > 0)
        text += newline.repeat(options.leading)

    /*  return resulting text  */
    return text
}

/*  API function: factory functionality  */
textframe.make = (defaultOptions = {}) =>
    (...args) =>
        textframe(...args, defaultOptions)

/*  export API  */
module.exports = textframe

