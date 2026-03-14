import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reportsRes] = await Promise.all([
          api.get('/api/auth/profile'),
          api.get('/api/reports/my-reports')
        ]);
        setUser(userRes.data);
        setReports(reportsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const downloadReport = (report) => {
    const symptoms = Object.entries(report.symptoms)
      .filter(([key, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
      .join(', ');

    const content = `
Smart Health Report
===================

Patient: ${user?.name}
Email: ${user?.email}
Date: ${new Date(report.createdAt).toLocaleDateString()}

Symptoms: ${symptoms || 'None reported'}
Prediction: ${report.prediction}
Duration: ${report.duration || 'N/A'} day(s)
Severity: ${report.severity || 'N/A'}
Medication Type: ${report.medicationType === 'hospital' ? 'Hospital/Doctor prescribed' : report.medicationType === 'self' ? 'Self-medication' : 'None'}
${report.medicationName ? `Medication Name: ${report.medicationName}` : ''}
${report.dosesPerDay ? `Doses per Day: ${report.dosesPerDay}` : ''}
Consulted Doctor: ${report.consultedDoctor === 'yes' ? 'Yes' : 'No'}

Report ID: ${report._id}
Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${report._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>My Health Profile</h2>
        <button onClick={logout} style={{background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}>Logout</button>
      </div>
      
      <div className="dashboard-section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="dashboard-section">
        <h3>My Health Reports ({reports.length})</h3>
        {reports.length === 0 ? (
          <p>No reports submitted yet.</p>
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
                  <div>
                    <h4 style={{margin: '0 0 10px 0', color: '#4facfe'}}>
                      {report.prediction}
                    </h4>
                    <p style={{margin: '5px 0', fontSize: '14px', color: '#cccccc'}}>
                      Date: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                    <p style={{margin: '5px 0', fontSize: '14px', color: '#666'}}>
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
                  <button 
                    onClick={() => downloadReport(report)}
                    style={{
                      background: '#27ae60',
                      color: 'white',
                      border: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;