const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('../models/User');

mongoose.Promise = global.Promise; // use ES6 promises

const ChartSchema = new Schema(
  {
    /* meta data of chart */
    name: { type: String, default: 'Untitled', min: 1, max: 1000 },
    author: { type: Schema.Types.ObjectId, ref: User },

    descIntro: { type: String, default: 'Untitled', min: 1, max: 10000 },
    description: { type: String, default: 'Untitled', min: 1, max: 10000 },

    // so the type of chart
    type: { type: String, required: true },

    chartKeys: [],
    indKeys: [],
    /* indicators/ sub-indicators of chart */
    indicatorItems: [
      {
        indicator: String,
        subIndicators: [String],
        indLabel: String,
        allSubIndicators: { type: [], default: [] },
        dataSource: String,
        aggregate: Boolean
      }
    ],

    dataFileUrl: String,

    /* so this one is used for trash */
    archived: { type: Boolean, default: false },
    archivedDate: { type: Date, default: null },

    // isDuplicate: { type: Boolean, default: false },

    _public: { type: Boolean, default: false },
    hiddenFromFeed: { type: Boolean, default: false },

    // with what team is this chart associated
    team: { type: String, default: '' },
    teams: [{ type: String }],

    /* chart options */
    // axis: { type: String },
    // color: { type: String },
    // frontColor: { type: String },
    // unit_of_measure: { type: String },
    // chartTypeY1: { type: String, default: 'all' },
    // chartTypeY2: { type: String, default: 'all' },
    // usedFilterColorsIndex: { type: Object, default: [] },

    selectedSources: [String],
    yearRange: String,

    selectedYear: String,
    selectedYears: [String],
    selectedCountryVal: [String],
    selectedRegionVal: [[]],
    selectedRegionCodes: [],
    specOptions: { type: Map, default: {} }
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'last_updated' }
  }
);

// const notFound = function(viz, id) {
//   if (!viz) return Promise.reject(new Error(`Chart with id ${id} not found`));
//   else return Promise.resolve(viz);
// };

ChartSchema.statics.findAndPopulate = function(query, cb) {
  return this.find(query).populate(
    'author',
    '_id firstName lastName avatar username'
  );
};

ChartSchema.statics.findAndPopulate = function(query, cb) {
  return this.find(query).populate(
    'author',
    '_id firstName lastName avatar username'
  );
};

ChartSchema.statics.findOneAndPopulate = function(query) {
  return this.findOne(query).populate(
    'author',
    '_id firstName lastName avatar username'
  );
};

ChartSchema.statics.updateAndPopulate = function(query, data) {
  return this.findOneAndUpdate(query, { $set: data }, { new: true })
    .populate('author', '_id firstName lastName avatar username')
    .then(viz => {
      return Promise.resolve(viz);
    });
};

ChartSchema.statics.countForUser = function(user, cb) {
  let query = {};
  query.author = user._id;

  return this.count(query).exec(cb);
};

ChartSchema.statics.findByUser = function(query, user, cb) {
  query = query || {};
  query.author = user._id;
  return this.findAndPopulate(query).exec(cb);
};

ChartSchema.statics.findOneByUser = function(id, user, cb) {
  const query = {
    _id: id,
    author: user._id
  };

  return this.findOneAndPopulate(query).then(viz => {
    if (!viz) return Promise.reject(new Error(`Viz with id ${id} not found`));
    else return Promise.resolve(viz);
  });
};

ChartSchema.statics.findOnePublic = function(id, cb) {
  let query = {
    _id: id
  };
  return this.findOneAndPopulate(query).then(viz => {
    if (!viz) return Promise.reject(new Error(`Viz with id ${id} not found`));
    else return Promise.resolve(viz);
  });
};

ChartSchema.statics.updateByUser = function(id, data, user) {
  let query = {
    _id: id,
    author: user._id
  };

  return this.updateAndPopulate(query, data);
};

ChartSchema.statics.deleteByUser = function(id, user) {
  let query = {
    _id: id,
    author: user._id
  };

  return this.findOneAndRemove(query);
};

ChartSchema.methods.saveAndPopulate = function() {
  return this.save().then(viz => {
    return viz
      .populate('author', '_id firstName lastName avatar username')
      .execPopulate(); // really mongoose....
  });
};

// ChartSchema.methods.refresh = function() {
//   /*
//    * get resulting data from OIPA for current visualization state
//    */
//
//   return getVisualizationResults(this);
// };

// ChartSchema.methods.addContext = function(context) {
//   /*
//    * Add a context filter
//    */
//
//   this.context.push(context);
//   return Promise.resolve(this);
// };

// ChartSchema.methods.removeContext = function(id) {
//   /*
//    * Add a context filter
//    */
//
//   this.context.remove(id);
//   return Promise.resolve(this);
// };

// ChartSchema.methods.replaceContext = function(contextId, context) {
//   /*
//    * replace a context filter
//    */
//
//   console.log('called replaceContext');
//
//   this.context.remove(contextId);
//   this.context.push(context);
//
//   return Promise.resolve(this);
// };
//
// ChartSchema.methods.addItem = function(item) {
//   /*
//    * get resulting data from OIPA for #{item}
//    * // TODO: Shold also add it and handle results accordingly - 2016-02-11
//    */
//
//   console.log('called addItem..');
//
//   return (
//     getResultItem(this, item)
//       // .then((item) => this.items.push(item))
//       // .then(([viz, results]) => viz.addResults(results))
//       .then(item => {
//         this.items.push(item);
//         return this;
//       })
//   );
// };

// ChartSchema.methods.removeItem = function(id) {
//   /*
//    * remove Item with id ${id}
//    */
//
//   this.items.remove(id);
//   return Promise.resolve(this);
//
//   // return this.removeResults(id)
//   //     .then(viz => {
//   //         viz.items.remove(id)
//   //         // viz.items = _(this.items) // TODO: give unique id to each item - 2016-02-12
//   //         //     .filter(item => !(item.id == id || item.aggregation == aggregation))
//   //         // viz.markModified('items')
//
//   //         return viz
//   //     })
// };

// ChartSchema.methods.replaceItems = function(item) {
//   /*
//    * Replace the item
//    */
//
//   let itemId = item._id;
//   this.items.remove(itemId);
//   const index = this.items.push(item);
//
//   return this;
// };

module.exports = mongoose.model(' Chart', ChartSchema);
