/*
**  TextFrame -- Re-Frame Multi-Line Text
**  Copyright (c) 2017-2024 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

const chai = require("chai")
const { expect } = chai
chai.config.includeStack = true

const textframe = require("../lib/textframe.node.js")

describe("TextFrame Library", () => {
    it("base functionality", () => {
        expect(typeof textframe).to.be.equal("function")
        expect(() => { textframe(null) }).to.throw(Error)
        expect(textframe("")).to.be.equal("")
        expect(textframe("x")).to.be.equal("x\n")
        expect(textframe(" ")).to.be.equal("")
        expect(textframe("\n\nx\n\n")).to.be.equal("x\n")
        expect(textframe("\n    foo\n        bar\n    quux\n")).to.be.equal("foo\n    bar\nquux\n")
        expect(textframe`\n    foo\n        bar\n    quux\n`).to.be.equal("foo\n    bar\nquux\n")
        const u = textframe.make({ indent: 4 })
        expect(u`foo`).to.be.equal("    foo\n")
    })
})

