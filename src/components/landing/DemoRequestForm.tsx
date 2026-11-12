"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";

import { useAppToast } from "@/lib/toast";
import { submitContactEnquiry } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";

import { Send } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "Demo Request",
  company:"",
  message: "",
};

const DemoRequestForm = ({
  open,
  onClose,
}: Props) => {

  const toast = useAppToast();

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState<any>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {

    const newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    // if (!form.message.trim()) {
    //   newErrors.message = "Message is required";
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {

      await submitContactEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company:form.company,
        subject: form.subject,
        message: form.message,
        flag: 'demo',
      });

      void trackEvent("generate_lead", { lead_type: "demo", page: window.location.pathname });

      toast.success(
        "Demo Request Sent",
        "We'll contact you shortly."
      );

      setForm(initialForm);

      onClose();

    } catch (error: any) {

      toast.error(
        "Submission Failed",
        error?.message ||
        "Please try again later."
      );

    } finally {

      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999]">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">

        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          <h2 className="text-3xl font-semibold mb-2">
            Request a Demo
          </h2>

          <p className="text-gray-500 mb-6">
            Fill out the form and our team will contact you shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 relative"
          >

            {isSubmitting && (
              <Loader
                variant="overlay"
                text="Sending request..."
              />
            )}

            <div>
              <Label>Full Name</Label>

              <Input
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Label>Email Address</Label>

              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label>Phone Number</Label>

              <PhoneInput
                value={form.phone}
                onChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    phone: value,
                  }))
                }
              />
            </div>
         
            <div>
              <Label>Company/Boutique Name</Label>

              <Input
                name="company"
                placeholder="Your company/boutique name"
                value={form.company}
                onChange={handleChange}
              />

              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company}
                </p>
              )}
            </div>
            <div>
              <Label>Message</Label>

              <Textarea
                rows={4}
                name="message"
                placeholder="Tell us about your boutique or alteration business..."
                value={form.message}
                onChange={handleChange}
              />

              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Demo Request
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DemoRequestForm;