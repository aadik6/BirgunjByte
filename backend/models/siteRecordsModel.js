const mongoose = require("mongoose");

const siteRecordSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
      unique: true,
    },
    totalUsers: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalNews: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAds: {
      type: Number,
      default: 0,
      min: 0,
    },
    siteVisits: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

siteRecordSchema.index({ date: 1 });

// Instance method to increment a field
siteRecordSchema.methods.incrementField = async function (field, value = 1) {
  if (this[field] !== undefined) {
    this[field] += value;
    await this.save();
  } else {
    throw new Error(`Field "${field}" does not exist in the schema.`);
  }
};

// Static method to get or create today's record
siteRecordSchema.statics.getOrCreateToday = async function () {
  const today = new Date().toISOString().split("T")[0];
  let record = await this.findOne({ date: today });
  if (!record) {
    record = await this.create({ date: today });
  }
  return record;
};

module.exports = mongoose.model("SiteRecord", siteRecordSchema);
