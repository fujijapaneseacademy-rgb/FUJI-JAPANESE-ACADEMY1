import React, { useState } from 'react';
import { Building2, Mail, Phone, User, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';

export const CorporateRfqForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    teamSize: '10-25',
    currentLevel: 'Zero / Beginners',
    deliveryMode: 'On-Premise (Bengaluru)',
    projectTimeline: 'Immediate (Next 30 Days)',
    specificRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitToGoogleSheet({
        formType: 'Corporate',
        name: formData.contactName,
        email: formData.workEmail,
        phone: formData.phone,
        companyName: formData.companyName,
        teamSize: formData.teamSize,
        course: 'Corporate Japanese Training for Enterprises',
        message: `Delivery: ${formData.deliveryMode} | Level: ${formData.currentLevel} | Timeline: ${formData.projectTimeline} | Requirements: ${formData.specificRequirements || 'Custom Enterprise Training'}`
      });
    } catch (err) {
      console.warn('Corporate RFQ submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-gray-900 text-white border border-gray-800 text-center max-w-2xl mx-auto shadow-2xl">
        <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold">Corporate Proposal Request Received</h3>
        <p className="text-gray-300 mt-2 text-sm sm:text-base">
          Thank you, <strong>{formData.contactName}</strong>. Our Enterprise Solutions Director will review your specifications for <strong>{formData.companyName}</strong> and deliver a custom syllabus and commercial proposal within 4 business hours.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-16 px-4 bg-gray-950 text-white" id="rfq-form">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            Enterprise Client Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Request a Custom Corporate Training Proposal (RFQ)
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Custom cohorts tailored for your tech stack, client deliverables, and delivery schedule.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Corporate / Enterprise Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rakuten India Enterprise Pvt Ltd"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Representative Name &amp; Title *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Narayanan (VP of Engineering)"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Official Corporate Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="e.g. narayanan@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Direct Phone / Mobile *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Target Batch Size
              </label>
              <select
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 outline-none"
              >
                <option value="5-10">Small Pilot Cohort (5–10 Engineers)</option>
                <option value="10-25">Standard Department Batch (10–25 Engineers)</option>
                <option value="25-50">Enterprise Division (25–50 Engineers)</option>
                <option value="50+">Large Scale Program (50+ Engineers)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Preferred Training Mode
              </label>
              <select
                value={formData.deliveryMode}
                onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 outline-none"
              >
                <option value="On-Premise (Bengaluru)">On-Premise at Client Campus (Bengaluru)</option>
                <option value="Live Virtual Online">Live Interactive Virtual Batches (Pan-India)</option>
                <option value="Fuji Academy Center">Executive Training at Fuji Academy (Electronic City)</option>
                <option value="Hybrid">Hybrid (Onsite Workshops + Virtual Drills)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Specific Objectives &amp; Target Client Accounts
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Training 18 Full-Stack Java developers in JLPT N4 and Technical Keigo for an upcoming automotive client migration in Tokyo."
              value={formData.specificRequirements}
              onChange={(e) => setFormData({ ...formData, specificRequirements: e.target.value })}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-700 rounded-xl text-white text-sm focus:border-red-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white font-bold text-base shadow-lg shadow-red-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Proposal Request...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate Customized RFP / Commercial Proposal</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CorporateRfqForm;
