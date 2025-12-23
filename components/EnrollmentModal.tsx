
import React, { useState } from 'react';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { EnrollmentStatus } from '../types';
import { submitToGoogleSheet } from '../services/formService';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, courseTitle }) => {
  const [status, setStatus] = useState<EnrollmentStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: courseTitle || 'General Inquiry',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const success = await submitToGoogleSheet({
      formType: 'Enrollment',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      message: formData.message
    });

    if (success) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 4000);
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 font-jp">
            {status === 'success' ? 'Arigatou Gozaimasu!' : 'Start Learning Today'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-800">Registration Received!</p>
              <p className="text-gray-500 mt-2">Data has been saved to our student sheet. We will contact you via phone shortly!</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-800">Submission Error</p>
              <p className="text-gray-500 mt-2 mb-6">Something went wrong. Please check your internet or try again later.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interested Course</label>
                <select 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="JLPT N5">JLPT N5 (Beginner)</option>
                  <option value="JLPT N4">JLPT N4 (Basic)</option>
                  <option value="JLPT N3">JLPT N3 (Intermediate)</option>
                  <option value="JLPT N2">JLPT N2 (Advanced)</option>
                  <option value="JLPT N1">JLPT N1 (Expert)</option>
                  <option value="Spoken Japanese">Spoken Japanese</option>
                  <option value="Corporate Training">Corporate Training</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting to Sheet...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
