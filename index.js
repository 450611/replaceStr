let fs = require('fs');
let { join, resolve } = require('path');
let { isArray, log } = require('./uitils');

/**
 * 
 * @param { RegExp } RegExp
 * @param { String | Number } output  
 */
function ReplaceStr (regExp, output) {
    this.regExp = regExp;
    this.output = output;
}

ReplaceStr.prototype.apply = function (compiler) {
    let self = this;
    compiler.plugin('emit', function (compilation, callback) {
        log('green', `\n`);
        compilation.chunks.forEach(function (chunk) {
            chunk.files.forEach(function (filename) {
                let type = filename.split('.');
                type = type[type.length - 1];
                if (type !== 'js') { return; }
                let source = compilation.assets[filename].source();
                let result = _replace(source, self.regExp, self.output, filename);
                compilation.assets[filename].source = () => result;
            });
        });
        callback();
    });
};

function _replace(source, reg, output, filename) {
    if (isArray(reg)) {
        reg.forEach(e => {
            _r(e)
        })
    } else {
        _r(reg)
    }
   
    function _r(r) {
        let re = new RegExp(r);
        source = source.replace(re, output);
        log('green', `${filename} replace Success`);
        return source;
    }
    return source;
}


module.exports = ReplaceStr;