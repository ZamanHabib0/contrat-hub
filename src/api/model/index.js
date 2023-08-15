const Models = {};

Models.user = require('./users.model');
Models.userProfile = require('./userProfile.model');
Models.company = require('./company.model');
Models.template = require('./template.model');
Models.contract = require('./contract.model');


module.exports = Models;
