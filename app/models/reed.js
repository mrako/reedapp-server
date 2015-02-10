var mongoose = require('mongoose');

module.exports = mongoose.model('Reed', {
  text : String,
  done : Boolean
});
