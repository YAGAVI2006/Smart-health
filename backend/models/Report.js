const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: {
    fever: Boolean,
    vomiting: Boolean,
    diarrhea: Boolean,
    stomachPain: Boolean
  },
  prediction: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);