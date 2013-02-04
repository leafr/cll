#### Cute little logger

    logger = require('cll')
     
    logger.config({
      padding: 3,
      levelmark: 'smile', // smile/text
      colors: true,
      timestamp: true
    })
    
    logger.info('ZOMG')
    logger.error('ZOMG')
    logger.fatal('ZOMG')
    
    //   ᶘᵒᴥᵒᶅ    ZOMG
    //   (-_-')   ZOMG
    //   (o//O)   ZOMG
    


