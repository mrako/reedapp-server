'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Reed', {
  user: {type : mongoose.Schema.ObjectId, ref : 'User'},
  code: String,
  instrument: String,
  color: String,
  staple: {
    name: String,
    length: Number
  },
  cane: {
    name: String,
    gouge: Number,
    shape: String,
    diameter: Number,
    hardness: Number,
    density: Number,
    elasticity: Number,
    age: Number,
    ratio: Number
  },
  binding_date: { type: Date, default: Date.now },
  scraping_date: { type: Date, default: Date.now },
  scraping_type: String,
  ratings: {
    sound: Number,
    intonation: Number,
    pitch: Number,
    response: Number,
    stability: Number,
    aperture: Number
  },
  notes: String
});
