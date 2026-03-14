import React, { useEffect, useState } from 'react';
import api from '../services/api';

function OutbreakMap() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/api/reports');
        setReports(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="container">
      <h2>Health Reports Overview</h2>
      <div className="dashboard-section">
        <p style={{textAlign: 'center', marginBottom: '20px', color: '#cccccc'}}>
          View all submitted health reports and disease patterns
        </p>
        <div style={{maxHeight: '600px', overflowY: 'auto'}}>
          {reports.length === 0 ? (
            <p style={{textAlign: 'center', color: '#aaaaaa'}}>No reports submitted yet.</p>
          ) : (
            <div style={{display: 'grid', gap: '15px'}}>
              {reports.map(report => (
                <div key={report._id} style={{
                  border: '1px solid #555',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#3a3a4e'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                    <div style={{flex: 1}}>
                      <h4 style={{margin: '0 0 10px 0', color: '#4facfe'}}>
                        {report.prediction}
                      </h4>
                      <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                        Patient: {report.patient.name}
                      </p>
                      <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                        Date: {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                      <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                        Symptoms: {Object.entries(report.symptoms)
                          .filter(([key, value]) => value)
                          .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
                          .join(', ') || 'None'}
                      </p>
                      <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                        Medication: {report.medicationType === 'hospital' ? 'Hospital/Doctor' : report.medicationType === 'self' ? 'Self-medication' : 'None'}
                        {report.medicationName && ` (${report.medicationName})`}
                      </p>
                      <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                        Consulted Doctor: {report.consultedDoctor === 'yes' ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutbreakMap;