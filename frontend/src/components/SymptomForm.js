import React, { useState } from 'react';
import api from '../services/api';

function SymptomForm() {
  const [form, setForm] = useState({ 
    fever:false, 
    headache:false, 
    cough:false, 
    soreThroat:false, 
    fatigue:false, 
    shortnessOfBreath:false, 
    vomiting:false, 
    diarrhea:false, 
    stomachPain:false, 
    musclePain:false, 
    lossOfTaste:false, 
    rash:false,
    severity: 'mild',
    duration: '',
    medicationType: 'none',
    medicationName: '',
    dosesPerDay: '',
    consultedDoctor: 'no'
  });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const getHomeRemedies = (disease) => {
    const remedies = {
      'COVID-19': [
        'Rest and isolate yourself from others',
        'Stay hydrated with water, herbal teas, and clear broths',
        'Use a humidifier to ease breathing',
        'Take over-the-counter pain relievers like acetaminophen for fever',
        'Gargle with warm salt water for sore throat'
      ],
      'Flu': [
        'Get plenty of rest',
        'Drink fluids like water, juice, and soup',
        'Use a humidifier to keep air moist',
        'Take acetaminophen or ibuprofen for fever and pain',
        'Eat light, nutritious foods'
      ],
      'Common Cold': [
        'Rest and sleep as much as possible',
        'Drink plenty of fluids',
        'Use saline nasal sprays or drops',
        'Gargle with warm salt water',
        'Use honey and lemon in warm water for sore throat'
      ],
      'Food Poisoning': [
        'Stay hydrated with clear fluids',
        'Eat bland foods like toast, rice, bananas',
        'Avoid dairy, caffeine, alcohol, and fatty foods',
        'Rest and let your body recover',
        'Use over-the-counter anti-nausea medication if needed'
      ],
      'Migraine': [
        'Rest in a dark, quiet room',
        'Apply cold or warm compresses to your head',
        'Stay hydrated',
        'Try relaxation techniques',
        'Avoid triggers like bright lights and strong smells'
      ],
      'Allergies': [
        'Avoid known allergens',
        'Use air purifiers and keep windows closed',
        'Take antihistamine medications',
        'Use saline nasal rinses',
        'Apply cold compresses to itchy eyes'
      ]
    };
    return remedies[disease] || [
      'Rest and stay hydrated',
      'Monitor your symptoms',
      'Take over-the-counter medications as needed',
      'Consult a healthcare professional if symptoms worsen'
    ];
  };

  const getMedicalAdvice = (severity, duration, medication, consultedDoctor) => {
    const durationNum = parseInt(duration) || 1;
    
    // Base advice by severity
    let baseAdvice = '';
    switch(severity) {
      case 'mild':
        baseAdvice = 'Your symptoms appear mild. Monitor your condition and consider home remedies.';
        break;
      case 'moderate':
        baseAdvice = 'Your symptoms are moderate. Try home remedies first, but schedule an appointment with your doctor within 1-2 days.';
        break;
      case 'severe':
        baseAdvice = 'Your symptoms are severe. Please seek immediate medical attention or visit the nearest healthcare facility.';
        break;
      default:
        baseAdvice = 'Monitor your symptoms closely and consult a healthcare professional if concerned.';
    }

    // Additional advice based on duration
    let durationAdvice = '';
    if (durationNum >= 7) {
      durationAdvice = ' Since your symptoms have persisted for a week or more, it\'s important to consult a healthcare professional for proper evaluation.';
    } else if (durationNum >= 3) {
      durationAdvice = ' If symptoms persist beyond 3-5 days or worsen, please consult a healthcare professional.';
    }

    // Additional advice based on medication type
    let medicationAdvice = '';
    if (medication === 'hospital') {
      medicationAdvice = ' Since you\'re taking prescribed medication, keep following your doctor\'s instructions and monitor your response. If symptoms worsen, reach out to a healthcare provider.';
    } else if (medication === 'self') {
      medicationAdvice = ' Since you\'re self-medicating, be cautious with doses and interactions. If symptoms don\'t improve or worsen, consult a healthcare professional.';
    } else {
      medicationAdvice = ' If symptoms worsen despite home remedies, consider consulting a healthcare professional.';
    }

    // Additional advice based on doctor consultation
    let doctorAdvice = '';
    if (consultedDoctor === 'no') {
      if (severity === 'severe' || durationNum >= 7) {
        doctorAdvice = ' Since you haven\'t consulted a doctor yet and your symptoms are concerning, please seek medical attention promptly.';
      } else if (severity === 'moderate' || durationNum >= 3) {
        doctorAdvice = ' Consider consulting a healthcare professional for proper evaluation and guidance.';
      }
    } else {
      doctorAdvice = ' Since you\'ve already consulted a doctor, follow their recommendations and contact them if symptoms change.';
    }

    // Combine advice
    if (severity === 'severe') {
      return baseAdvice + durationAdvice + doctorAdvice;
    } else {
      return baseAdvice + durationAdvice + ' ' + medicationAdvice + ' ' + doctorAdvice;
    }
  };

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/reports', form);
      const prediction = res.data.prediction;
      const remedies = getHomeRemedies(prediction);
      const advice = getMedicalAdvice(form.severity, form.duration, form.medicationType, form.consultedDoctor);
      
      setResult({
        prediction,
        remedies,
        advice,
        severity: form.severity,
        duration: form.duration,
        medicationType: form.medicationType,
        medicationName: form.medicationName,
        dosesPerDay: form.dosesPerDay,
        consultedDoctor: form.consultedDoctor
      });
    } catch (err) {
      alert('Failed to submit report');
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <h3 style={{color: '#e74c3c', marginBottom: '20px'}}>Symptom Checklist</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px'}}>
          <div className="checkbox-group">
            <input type="checkbox" name="fever" onChange={handleChange}/>
            <label>Fever</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="headache" onChange={handleChange}/>
            <label>Headache</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="cough" onChange={handleChange}/>
            <label>Cough</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="soreThroat" onChange={handleChange}/>
            <label>Sore Throat</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="fatigue" onChange={handleChange}/>
            <label>Fatigue</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="shortnessOfBreath" onChange={handleChange}/>
            <label>Shortness of Breath</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="vomiting" onChange={handleChange}/>
            <label>Vomiting</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="diarrhea" onChange={handleChange}/>
            <label>Diarrhea</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="stomachPain" onChange={handleChange}/>
            <label>Stomach Pain</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="musclePain" onChange={handleChange}/>
            <label>Muscle Pain</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="lossOfTaste" onChange={handleChange}/>
            <label>Loss of Taste/Smell</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="rash" onChange={handleChange}/>
            <label>Rash</label>
          </div>
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Severity Level:</label>
          <div style={{display: 'flex', gap: '15px'}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="severity" value="mild" checked={form.severity === 'mild'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Mild
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="severity" value="moderate" checked={form.severity === 'moderate'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Moderate
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="severity" value="severe" checked={form.severity === 'severe'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Severe
            </label>
          </div>
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label>How many days have you been experiencing these symptoms?</label>
          <input 
            type="number" 
            name="duration" 
            value={form.duration} 
            onChange={handleChange} 
            placeholder="Enter number of days" 
            min="1" 
            max="365"
            required 
          />
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Are you taking medication?</label>
          <div style={{display: 'flex', gap: '15px'}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="medicationType" value="none" checked={form.medicationType === 'none'} onChange={handleChange} style={{marginRight: '5px'}}/>
              No medication
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="medicationType" value="hospital" checked={form.medicationType === 'hospital'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Hospital/Doctor prescribed
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="medicationType" value="self" checked={form.medicationType === 'self'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Self-medication (own medicine)
            </label>
          </div>
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label>Which medication are you taking?</label>
          <input 
            type="text" 
            name="medicationName" 
            value={form.medicationName} 
            onChange={handleChange} 
            placeholder={form.medicationType === 'none' ? "Select medication type above first" : "Enter medication name(s)"}
            disabled={form.medicationType === 'none'}
          />
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label>How many doses per day?</label>
          <input 
            type="number" 
            name="dosesPerDay" 
            value={form.dosesPerDay} 
            onChange={handleChange} 
            placeholder={form.medicationType === 'none' ? "Select medication type above first" : "Enter number of doses"}
            min="1" 
            max="10"
            disabled={form.medicationType === 'none'}
          />
        </div>
        
        <div className="form-group" style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '10px', fontWeight: 'bold'}}>Have you consulted a doctor for these symptoms?</label>
          <div style={{display: 'flex', gap: '15px'}}>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="consultedDoctor" value="yes" checked={form.consultedDoctor === 'yes'} onChange={handleChange} style={{marginRight: '5px'}}/>
              Yes, I have consulted a doctor
            </label>
            <label style={{display: 'flex', alignItems: 'center'}}>
              <input type="radio" name="consultedDoctor" value="no" checked={form.consultedDoctor === 'no'} onChange={handleChange} style={{marginRight: '5px'}}/>
              No, I haven't consulted a doctor
            </label>
          </div>
        </div>
        
        <button type="submit">Submit Symptom Report</button>
      </form>

      {result && (
        <div className="dashboard-section" style={{marginTop: '30px', border: '2px solid #4facfe', background: '#2a2a4e'}}>
          <h3 style={{color: '#4facfe', marginBottom: '15px'}}>Health Assessment Results</h3>
          
          <div style={{marginBottom: '20px'}}>
            <h4 style={{color: '#ff6b6b', marginBottom: '10px'}}>Predicted Condition: {result.prediction}</h4>
            <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Severity Level:</strong> {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}</p>
            <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Duration:</strong> {result.duration} day{result.duration !== '1' ? 's' : ''}</p>
            <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Medication:</strong> {result.medicationType === 'hospital' ? 'Hospital/Doctor prescribed' : result.medicationType === 'self' ? 'Self-medication' : 'None'}</p>
            {result.medicationName && <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Medication Name:</strong> {result.medicationName}</p>}
            {result.dosesPerDay && <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Doses per Day:</strong> {result.dosesPerDay}</p>}
            <p style={{color: '#cccccc', marginBottom: '10px'}}><strong>Consulted Doctor:</strong> {result.consultedDoctor === 'yes' ? 'Yes' : 'No'}</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4 style={{color: '#4ecdc4', marginBottom: '10px'}}>🏠 Recommended Home Remedies:</h4>
            <ul style={{color: '#cccccc', paddingLeft: '20px'}}>
              {result.remedies.map((remedy, index) => (
                <li key={index} style={{marginBottom: '5px'}}>{remedy}</li>
              ))}
            </ul>
          </div>

          <div style={{borderTop: '1px solid #555', paddingTop: '15px'}}>
            <h4 style={{color: result.severity === 'severe' ? '#ff4757' : '#ffa726', marginBottom: '10px'}}>
              {result.severity === 'severe' ? '⚠️ Medical Attention Required' : 'ℹ️ Medical Advice'}
            </h4>
            <p style={{color: '#cccccc', fontSize: '16px', lineHeight: '1.5'}}>{result.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;