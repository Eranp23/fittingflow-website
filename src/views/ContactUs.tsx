"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCirclePlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from "@/components/Header";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Loader } from '@/components/ui/loader';
import { useAppToast } from "@/lib/toast";
import { formatPhoneDisplay, isValidPhone } from '@/utils/phoneUtils';
import { submitContactEnquiry } from "@/lib/contact";
import { trackEvent } from '@/lib/analytics';
import Footer from '@/components/landing/Footer';
import { pageSeo } from "@/lib/seoPages";

//hardcoded office details and map coordinates for demonstration purposes
const OFFICE_ADDRESS = {
  company: "Tekgaru LLC d/b/a FittingFlow",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  phone: "9296606191",
  office:"8888390060",
  email: "info@fittingflow.com",
};

const OFFICE_COORDINATES = {
  lat: 25.7617,
  lng: -80.1918,
};

// Google Maps embed URL using coordinates
const MAP_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3592.5!2d${OFFICE_COORDINATES.lng}!3d${OFFICE_COORDINATES.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`;
// ============================================================

interface EnquiryForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: EnquiryForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const ContactUs = () => {
  const toast = useAppToast();
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [errors, setErrors] = useState<Partial<EnquiryForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<EnquiryForm> = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (form.phone && !isValidPhone(form.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitContactEnquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: "",
        subject: form.subject.trim(),
        message: form.message.trim(),
        flag: 'contact',
      });
      void trackEvent('generate_lead', { lead_type: 'contact', page: '/contact' });
      toast.success('Enquiry Sent', 'We will get back to you soon.');
      setForm(initialForm);
      setErrors({});
    } catch (error: any) {
      toast.error('Enquiry Failed', error?.message || 'Failed to send enquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <Header />
 {/* Hero */}
 <section className="pt-32 pb-12 px-6" style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-pink-600 mb-4">Get in touch with us</p>
          <h1 className="text-4xl md:text-5xl  text-slate-900 font-extralight mb-4">
           Contact FittingFlow
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 mb-8">
          We'd love to hear from you. Reach out with any questions or enquiries.
          </p>

         
        </div>
      </section>
      {/* Content */}
      <div className="container  mt-20 mx-auto px-6 py-12 max-w-6xl">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Map & Address */}
          <div>

            {/* Office Details */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">Our Office</h2>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{OFFICE_ADDRESS.company}</p>
                  {OFFICE_ADDRESS.street && <p className="text-gray-600">{OFFICE_ADDRESS.street}</p>}
                  {OFFICE_ADDRESS.city && <p className="text-gray-600">{OFFICE_ADDRESS.city}, {OFFICE_ADDRESS.state} {OFFICE_ADDRESS.zip}</p>}
                  <p className="text-gray-600">{OFFICE_ADDRESS.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-pink-500 shrink-0" />
                <p className="text-gray-600">{formatPhoneDisplay(OFFICE_ADDRESS.phone)},</p>
                <p className="text-gray-600">{formatPhoneDisplay(OFFICE_ADDRESS.office)}</p>
                
              </div>
              <div className="flex items-center gap-3">
                <MessageCirclePlusIcon className="h-5 w-5 text-pink-500 shrink-0"   />
                <a href="https://api.whatsapp.com/send?phone=19296996150">Direct message on whatsapp</a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-pink-500 shrink-0" />
                <p className="text-gray-600">{OFFICE_ADDRESS.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-pink-500 shrink-0" />
                <div>
                  <p className="text-gray-600">Monday &ndash; Sunday - 24 Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enquiry Form */}
          <div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us an Enquiry</h2>
              <p className="text-gray-500 mb-6">Fill in the form below and we'll get back to you as soon as possible.</p>

              {isSubmitting && <Loader variant="overlay" text="Sending enquiry..." />}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-red-400' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-400' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    id="phone"
                    value={form.phone}
                    onChange={(value) => {
                      setForm(prev => ({ ...prev, phone: value }));
                      if (errors.phone) {
                        setErrors(prev => ({ ...prev, phone: undefined }));
                      }
                    }}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'border-red-400' : ''}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your enquiry..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? 'border-red-400' : ''}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Enquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

 <Footer />
    </div>
  );
};

export default ContactUs;
