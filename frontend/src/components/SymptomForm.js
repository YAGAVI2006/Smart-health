import React, { useState } from 'react';
import api from '../services/api';

function SymptomForm() {
  const [form, setForm] = useState({ fever:false, vomiting:false, diarrhea:false, stomachPain:false, location:'' });
  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/reports', form);
      alert('Report submitted: ' + res.data.prediction);
    } catch (err) {
      alert('Failed to submit');
    }
  };
  return (
    <form onSubmit={submit}>
      <div><label><input type="checkbox" name="fever" onChange={handleChange}/> Fever</label></div>
      <div><label><input type="checkbox" name="vomiting" onChange={handleChange}/> Vomiting</label></div>
      <div><label><input type="checkbox" name="diarrhea" onChange={handleChange}/> Diarrhea</label></div>
      <div><label><input type="checkbox" name="stomachPain" onChange={handleChange}/> Stomach Pain</label></div>
      <div><label>Location <input name="location" value={form.location} onChange={handleChange} /></label></div>
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default SymptomForm;