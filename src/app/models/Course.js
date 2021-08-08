const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema({
    _id: { type: Number,},
    title: { type: String, require: true, } ,
    desc: { type: String},
    img: { type: String },
    content: {type: String},
    slug: { type: String, slug: 'title', unique: true},
  }, {
    _id: false,
    timestamps: true,
  },
);
//Custom query helper
Course.query.sortable = function (req){
  if (req.query.hasOwnProperty('_sort')) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidtype ? req.query.type : 'desc',
    });
  }
  return this;
};

  //Add plugin
    mongoose.plugin(slug);
    Course.plugin(AutoIncrement);
    Course.plugin(mongooseDelete, {
      deletedAt: true,
      overrideMethods: 'all',
     });

  module.exports = mongoose.model('Course', Course);