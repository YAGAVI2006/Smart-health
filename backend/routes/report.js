const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Report = require('../models/Report');

// submit new symptom report
router.post('/', auth, async (req, res) => {
  try {
    const { fever, headache, cough, soreThroat, fatigue, shortnessOfBreath, vomiting, diarrhea, stomachPain, musclePain, lossOfTaste, rash, severity, duration, medicationType, medicationName, dosesPerDay, consultedDoctor } = req.body;
    // simple disease prediction mock
    let prediction = 'Healthy';
    if (fever && cough && soreThroat && fatigue) prediction = 'Common Cold';
    else if (fever && cough && shortnessOfBreath && fatigue) prediction = 'COVID-19';
    else if (fever && headache && vomiting && fatigue) prediction = 'Flu';
    else if (fever && diarrhea) prediction = 'Cholera';
    else if (fever && stomachPain) prediction = 'Typhoid';
    else if (vomiting && diarrhea) prediction = 'Food Poisoning';
    else if (diarrhea && stomachPain) prediction = 'Gastroenteritis';
    else if (rash && fever) prediction = 'Chickenpox';
    else if (headache && fever && vomiting) prediction = 'Migraine';
    else if (cough && soreThroat) prediction = 'Strep Throat';
    else if (fatigue && musclePain) prediction = 'Chronic Fatigue';
    else if (lossOfTaste && fever) prediction = 'Viral Infection';
    else if (fever || headache || cough || soreThroat || fatigue || shortnessOfBreath || vomiting || diarrhea || stomachPain || musclePain || lossOfTaste || rash) prediction = 'General Illness';

    const report = new Report({
      patient: req.user.id,
      symptoms: { fever, headache, cough, soreThroat, fatigue, shortnessOfBreath, vomiting, diarrhea, stomachPain, musclePain, lossOfTaste, rash },
      severity: severity || 'mild',
      duration: duration || 1,
      medicationType: medicationType || 'none',
      medicationName: medicationName || '',
      dosesPerDay: dosesPerDay || null,
      consultedDoctor: consultedDoctor || 'no',
      prediction
    });
    await report.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// admin stats
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Admin only' });
    const stats = await Report.aggregate([
      { $group: { _id: '$prediction', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// get user's own reports
router.get('/my-reports', auth, async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;