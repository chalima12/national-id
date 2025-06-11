// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    sex: '',
    region: '',
    zone: '',
    woreda: '',
    city: '',
    phone: '',
    idNumber: '',
    nationality: '',
    photo: null
  });

  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef(null);

  const defaultPhoto =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/320px-Flag_of_Ethiopia.svg.png';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement('a');
    link.download = `${formData.fullName || 'ethiopian_id'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-4">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="grid gap-2 w-full max-w-md mx-auto">
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="dob" type="date" onChange={handleChange} required />
          <select name="sex" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="region" placeholder="Region" onChange={handleChange} required />
          <input name="zone" placeholder="Zone" onChange={handleChange} required />
          <input name="woreda" placeholder="Woreda" onChange={handleChange} required />
          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="idNumber" placeholder="ID Number" onChange={handleChange} required />
          <input name="nationality" placeholder="Nationality" onChange={handleChange} required />
          <input name="photo" type="file" accept="image/*" onChange={handleChange} />
          <button type="submit">Generate ID</button>
        </form>
      ) : (
        <>
          <div ref={cardRef} className="max-w-md mx-auto mt-4 p-4 border shadow-lg bg-white rounded-xl text-sm">
            <h2 className="text-xl font-bold text-center mb-4">Ethiopian Digital ID</h2>
            <div className="flex items-center gap-4">
              <img
                src={formData.photo ? URL.createObjectURL(formData.photo) : defaultPhoto}
                alt="ID"
                className="w-24 h-24 object-cover border rounded"
              />
              <div>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>DOB:</strong> {formData.dob}</p>
                <p><strong>Sex:</strong> {formData.sex}</p>
                <p><strong>ID No:</strong> {formData.idNumber}</p>
              </div>
            </div>
            <div className="mt-4">
              <p><strong>Region:</strong> {formData.region}</p>
              <p><strong>Zone:</strong> {formData.zone}</p>
              <p><strong>Woreda:</strong> {formData.woreda}</p>
              <p><strong>City:</strong> {formData.city}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Nationality:</strong> {formData.nationality}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded">
              Download ID
            </button>
          </div>
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
