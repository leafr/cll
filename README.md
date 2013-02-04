#### Cute little logger

```javascript
logger = require('cll')
     
logger.config({
  padding: 3,
  levelmark: 'smile', // smile/text
  colors: true,
  timestamp: true
})

logger.info('ZOMG')    //   ᶘᵒᴥᵒᶅ    ZOMG
logger.error('ZOMG')   //   (-_-')   ZOMG
logger.fatal('ZOMG')   //   (o//O)   ZOMG
```    


