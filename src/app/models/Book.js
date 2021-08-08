const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Book = new Schema({
  _id: { type: Number,},
    desc: { type: String},
    img: { type: String },
    content: { type: String },
    title: { type: String, require: true, } ,
    slug: { type: String, slug: 'title', unique: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
},
{
  _id: false,
    timestamps: true,
  },);

  Book.query.sortable = function (req){
    if (req.query.hasOwnProperty('_sort')) {
      const isValidtype = ['asc', 'desc'].includes(req.query.type);
      return this.sort({
          [req.query.column]: isValidtype ? req.query.type : 'desc',
      });
    }
    return this;
  };

  //add plugin
  // Book.plugin(AutoIncrement);
  Book.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
  })
mongoose.plugin(slug);
module.exports = mongoose.model('Book', Book);