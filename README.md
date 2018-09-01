[![npm version](https://badge.fury.io/js/%40be4code%2Fngx-double-scrollbar.svg)](https://badge.fury.io/js/%40be4code%2Fngx-double-scrollbar)
[![npm downloads](https://img.shields.io/npm/dm/@be4code/ngx-double-scrollbar.svg)](https://npmjs.org/@be4code/ngx-double-scrollbar)
[![Build Status](https://travis-ci.org/be4code/ngx-double-scrollbar.svg?branch=master)](https://travis-ci.org/be4code/ngx-double-scrollbar)

# NgxDoubleScrollbar

`ngx-double-scrollbar` is Angular component that generates second scrollbar when the content is long enough to create a horizontal scrollbar. 


## Installation

To use `ngx-double-scrollbar` in your project install it via [npm](https://www.npmjs.com/package/@be4code/ngx-double-scrollbar):
```
npm install --save @be4code/ngx-double-scrollbar
```


## Usage
Import `DoubleScrollbarModule` and add it to module imports.
```
import { DoubleScrollbarModule } from '@be4code/ngx-double-scrollbar';

@NgModule({
    imports: [
        DoubleScrollbarModule
    ]
})
```

Wrap a long element with `<ngx-double-scrollbar></ngx-double-scrollbar>`
```
<ngx-double-scrollbar>
    <div class="long-content">
      ...
    </div>
</ngx-double-scrollbar>    
```
When `ngx-double-scrollbar` content is longer than its container, two scrollbar will be shown: one above and one below the content.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
