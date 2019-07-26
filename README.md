# replaceStr
主要是对webpack打包之后的代码里面第三方插件的敏感词之类的进行替换
```bash
npm install --save-dev words-replace

```

```javascript
const wordsReplace = require('words-replace');
let webPackConfig = {
  plugins: [
     //....
     new wordsReplace(/[0-9]/g, 'output')
     //...
  ]
}
```
