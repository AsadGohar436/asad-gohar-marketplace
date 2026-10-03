import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitInquiry, isSupabaseConfigured } from '../lib/supabase';
import { BRAND_PROFILE } from '../brand';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [projectType, setProjectType] = useState('Remotion Video Motion Kit');
  const [estimatedTimeline, setEstimatedTimeline] = useState('Within 2 weeks');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await submitInquiry({
        name,
        email,
        linkedinUrl,
        projectType,
        estimatedTimeline,
        message,
      });

      if (res.success) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#10b981', '#34d399', '#059669', '#ffffff'],
        });
      } else {
        setErrorMessage(res.error || 'Failed to submit inquiry.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setLinkedinUrl('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-brand-accent tracking-wider">
              Direct Engineering Consultation
            </span>
            <h2 className="text-xl font-bold text-brand-text mt-0.5">
              Work with {BRAND_PROFILE.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-brand-card hover:bg-brand-border text-brand-dim hover:text-brand-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent/50 text-brand-accent flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-brand-text">Inquiry Dispatched</h3>
              <p className="text-xs text-brand-dim max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. Your technical inquiry has been recorded in our PostgreSQL schema. Asad Gohar will review your project and reply promptly.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-xs shadow-md glow-accent"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                  placeholder="e.g. Jordan Smith"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                    placeholder="jordan@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent font-mono"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                    Project Category
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                  >
                    <option value="Remotion Video Motion Kit">Remotion Video Motion Kit</option>
                    <option value="Emerald Carousel Still Studio">Emerald Carousel Still Studio</option>
                    <option value="Full-Stack Dev Portfolio">Full-Stack Dev Portfolio</option>
                    <option value="LinkedIn Lead Automation">LinkedIn Lead Automation</option>
                    <option value="Schema & API Sprint">Schema & API Sprint</option>
                    <option value="Custom Technical Consultation">Custom Technical Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                    Estimated Timeline
                  </label>
                  <select
                    value={estimatedTimeline}
                    onChange={(e) => setEstimatedTimeline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent"
                  >
                    <option value="Immediate (This week)">Immediate (This week)</option>
                    <option value="Within 2 weeks">Within 2 weeks</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="Exploratory discussion">Exploratory discussion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-brand-dim mb-1">
                  Project Message / Technical Scope *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-brand-surface border border-brand-border text-brand-text focus:outline-none focus:border-brand-accent leading-relaxed"
                  placeholder="Detail your goals, required formats, integrations, or specific LinkedIn objectives..."
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-400 font-mono">{errorMessage}</p>
              )}

              <div className="pt-2 text-[11px] font-mono text-brand-dim flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                <span>
                  Storage: {isSupabaseConfigured ? 'Supabase Database Connected' : 'Simulated PostgreSQL Storage'}
                </span>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-brand-dim hover:text-brand-text transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-brand-gradient text-brand-bg font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg glow-accent hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching...' : 'Send Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
