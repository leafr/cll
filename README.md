#### Cute little logger

```javascript
logger = require('cll')

logger.configure({
  colors: true,
  levelmark: 'smile', // smile or text
  pid: true,
  time: true,
  delimiter: ' | '
})

logger.info('ZOMG')
logger.error('ZOMG')   
logger.fatal('ZOMG')  

//  ᶘᵒᴥᵒᶅ     | 4169 | 04:32:47 | ZOMG
//  (-_-')    | 4169 | 04:32:47 | ZOMG
//  (O//o)    | 4169 | 04:32:47 | ZOMG
```    

