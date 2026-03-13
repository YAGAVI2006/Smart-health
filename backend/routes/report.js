const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Report = require('../models/Report');

// submit new symptom report
router.post('/', auth, async (req, res) => {
  try {
    const { fever, vomiting, diarrhea, stomachPain, location } = req.body;
    // simple disease prediction mock
    let prediction = 'Unknown';
    if (fever && diarrhea) prediction = 'Cholera';
    else if (fever && stomachPain) prediction = 'Typhoid';
    else if (vomiting && diarrhea) prediction = 'Dysentery';
    else if (diarrhea && stomachPain) prediction = 'Gastroenteritis';

    const report = new Report({
      patient: req.user.id,
      symptoms: { fever, vomiting, diarrhea, stomachPain },
      prediction,
      location
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

// get all reports for outbreak map
router.get('/', auth, async (req, res) => {
  try {
    const reports = await Report.find().populate('patient', ['name']);
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;