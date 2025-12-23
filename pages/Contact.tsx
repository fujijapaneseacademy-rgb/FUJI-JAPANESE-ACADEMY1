
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Course Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const success = await submitToGoogleSheet({
      formType: 'Contact',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: 'N/A (Contact Form)',
      subject: formData.subject,
      message: formData.message
    });

    if (success) {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: 'Course Inquiry', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-12">Get in Touch</h1>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Info */}
          <div className="p-10 bg-indigo-900 text-white flex flex-col justify-between">
             <div>
               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
               <p className="text-indigo-200 mb-10">
                 Have questions about our courses or want to schedule a visit? Reach out to us directly.
               </p>

               <div className="space-y-8">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-lg"><Phone className="w-6 h-6 text-red-400" /></div>
                   <div>
                     <p className="text-sm text-indigo-200 uppercase tracking-wide">Phone</p>
                     <p className="font-semibold text-lg">+91 90710 54569</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-lg"><Mail className="w-6 h-6 text-red-400" /></div>
                   <div>
                     <p className="text-sm text-indigo-200 uppercase tracking-wide">Email</p>
                     <p className="font-semibold text-lg">fujijapaneseacademy@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-lg"><MapPin className="w-6 h-6 text-red-400" /></div>
                   <div>
                     <p className="text-sm text-indigo-200 uppercase tracking-wide">Campus</p>
                     <p className="font-semibold text-lg">Electronic City, Bengaluru</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="mt-12">
               <div className="w-full h-48 rounded-xl overflow-hidden bg-indigo-800 relative shadow-inner">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    title="map" 
                    className="absolute inset-0 opacity-90 hover:opacity-100 transition-opacity"
                    frameBorder="0" 
                    scrolling="no" 
                    src="https://maps.google.com/maps?q=Fuji%20Japanese%20Institute%2C%20Electronic%20City%2C%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  ></iframe>
               </div>
             </div>
          </div>

          {/* Form */}
          <div className="p-10 relative">
            {status === 'success' && (
              <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-slate-500">We have received your message in our logs and will reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-indigo-600 font-bold">Send another message</button>
              </div>
            )}

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input 
                    required 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input 
                    required 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                    placeholder="Doe" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                  placeholder="john@example.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                >
                  <option>Course Inquiry</option>
                  <option>Book Free Trial</option>
                  <option>Corporate Training</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                ) : 'Send Message'}
              </button>
              
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm font-medium mt-2">
                  <AlertCircle className="w-4 h-4" />
                  Failed to send. Please check your connection.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
