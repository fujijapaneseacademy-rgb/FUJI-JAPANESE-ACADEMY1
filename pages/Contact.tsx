
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
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

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Contact Info & Map */}
          <div className="p-8 md:p-10 bg-indigo-900 text-white flex flex-col">
             <div className="flex-1">
               <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
               <p className="text-indigo-200 mb-10">
                 Join us at our Electronic City campus for an immersive Japanese learning experience.
               </p>

               <div className="space-y-6 mb-10">
                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-xl"><Phone className="w-5 h-5 text-red-400" /></div>
                   <div>
                     <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Call Us</p>
                     <p className="font-semibold">+91 90710 54569</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-xl"><Mail className="w-5 h-5 text-red-400" /></div>
                   <div>
                     <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Email</p>
                     <p className="font-semibold">fujijapaneseacademy@gmail.com</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4">
                   <div className="p-3 bg-white/10 rounded-xl"><MapPin className="w-5 h-5 text-red-400" /></div>
                   <div>
                     <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Location</p>
                     <p className="font-semibold text-sm">Fuji Japanese Institute, 1st Floor, Electronic City Main Rd, Bengaluru 560100</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* Integrated Map */}
             <div className="w-full h-64 md:h-72 rounded-2xl overflow-hidden bg-indigo-950 relative border border-white/10 shadow-2xl group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  title="Fuji Japanese Institute Map" 
                  className="absolute inset-0 grayscale-[0.2] contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                  frameBorder="0" 
                  scrolling="no" 
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.965882414777!2d77.6711111!3d12.8466666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6ce2d615951d%3A0xc6c7608e09f52b75!2sFuji%20Japanese%20Institute!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                ></iframe>
                <a 
                  href="https://share.google/9o4Kba6dxJQxQ1h5L" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white text-indigo-900 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold"
                >
                  Open in Maps <ExternalLink className="w-3 h-3" />
                </a>
             </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-10 relative">
            {status === 'success' && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8 max-w-xs">Arigatou Gozaimasu! We have received your inquiry and will respond via email shortly.</p>
                <button 
                  onClick={() => setStatus('idle')} 
                  className="px-8 py-2 border-2 border-indigo-900 text-indigo-900 font-bold rounded-full hover:bg-indigo-900 hover:text-white transition-all"
                >
                  Send Another
                </button>
              </div>
            )}

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
            <p className="text-slate-500 mb-8 text-sm">Have a specific question? We're here to help you start your Japanese journey.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">First Name</label>
                  <input 
                    required 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                    placeholder="Kenji" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Last Name</label>
                  <input 
                    required 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                    placeholder="Sato" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Email Address</label>
                <input 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" 
                  placeholder="kenji@example.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all appearance-none"
                >
                  <option>Course Inquiry</option>
                  <option>Free Trial Class</option>
                  <option>Corporate Training</option>
                  <option>Translation Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">Message</label>
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none" 
                  placeholder="Tell us about your learning goals..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : 'Submit Inquiry'}
              </button>
              
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-xs font-bold mt-2">
                  <AlertCircle className="w-4 h-4" />
                  Connection error. Please try again or call us.
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
