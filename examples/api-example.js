var crawler = require('../lib'),
    options = {
        start: ['../'],
        exclude: ['.'],
        json: 'licenses.json',
        unknown: false
    };

crawler.dumpLicenses(options,
    function(error, res){
        if (error) {
            console.error("Error:", error);
        }
        else {
            console.dir(res);
        }
    }
);