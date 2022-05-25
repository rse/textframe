
TextFrame
=========

Re-Frame Multi-Line Text

<p/>
<img src="https://nodei.co/npm/textframe.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/textframe.png" alt=""/>

About
-----

This is a tiny JavaScript function for the Browser and Node.js to
re-frame a multi-line text by stripping unnecessary extra indentation,
strip trailing whitespace characters, strip unecessary leading and
trailing blank lines and then optionally add back again some indentation
and leading and trailing blank lines. This function allows you to
re-frame a piece of multi-line text and is especially intended to be
used with ES2015 multi-line string literals.

Installation
------------

```shell
$ npm install textframe
```

Usage
-----

```js
const textframe = require("textframe")

/*  direct usage  */
textframe(`
    foo
        bar
    baz
        quux
`) --> "foo\n    bar\nbaz    quux\n"

/*  tagged template string usage  */
const bar = "bar"
textframe`
    foo
        ${bar}
    baz
        quux
` --> "foo\n    bar\nbaz    quux\n"

/*  factory usage  */
let tf = textframe.make({ indent: 4 })
console.log(tf("foo")) --> "    foo\n"
console.log(tf`foo`)   --> "    foo\n"
```

Application Programming Interface (API)
---------------------------------------

```js
textframe(
    text: string,             /*  input text  */
    options?: {               /*  optional processing options  */
        tabsize:  number = 8, /*  expand TAB characters by 8 spaces  */
        indent:   number = 0, /*  (re-)indent by N spaces  */
        leading:  number = 0, /*  (re-)add N leading blank lines  */
        trailing: number = 0  /*  (re-)add N trailing blank lines  */
    }
}): string                    /*  output text  */
```

License
-------

Copyright (c) 2017-2022 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

