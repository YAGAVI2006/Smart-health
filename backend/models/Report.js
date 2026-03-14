const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: {
    fever: Boolean,
    headache: Boolean,
    cough: Boolean,
    soreThroat: Boolean,
    fatigue: Boolean,
    shortnessOfBreath: Boolean,
    vomiting: Boolean,
    diarrhea: Boolean,
    stomachPain: Boolean,
    musclePain: Boolean,
    lossOfTaste: Boolean,
    rash: Boolean
  },
  severity: { type: String, enum: ['mild', 'moderate', 'severe'], default: 'mild' },
  duration: { type: Number, min: 1, max: 365 },
  medicationType: { type: String, enum: ['none', 'hospital', 'self'], default: 'none' },
  medicationName: { type: String, default: '' },
  dosesPerDay: { type: Number, min: 1, max: 10 },
  consultedDoctor: { type: String, enum: ['yes', 'no'], default: 'no' },
  prediction: String
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);