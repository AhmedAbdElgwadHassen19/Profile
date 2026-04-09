"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

function ContactFormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  useEffect(() => {
    if (serviceParam) {
      form.setValue('subject', `Inquiry: ${serviceParam}`);
      form.setValue('message', `Hello,\n\nI am interested in your "${serviceParam}" service. I'd like to discuss more details about how we can start.\n\nThank you.`);
    }
  }, [serviceParam, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    // إعداد رسالة الواتساب
    const phoneNumber = "201201302871"; // استبدل هذا برقمك الحقيقي بدون "+"
    const text = `*New Contact Request*%0A%0A*Name:* ${values.name}%0A*Email:* ${values.email || 'Not provided'}%0A*Subject:* ${values.subject}%0A*Message:* ${values.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300 font-medium tracking-wide">Your Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl focus-visible:ring-indigo-500 placeholder:text-zinc-600 text-white shadow-inner" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300 font-medium tracking-wide">Email <span className="text-zinc-600 text-xs">(Optional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl focus-visible:ring-indigo-500 placeholder:text-zinc-600 text-white shadow-inner" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300 font-medium tracking-wide">Subject *</FormLabel>
              <FormControl>
                <Input placeholder="How can I help you?" {...field} className="bg-zinc-900/50 border-white/10 h-14 rounded-2xl focus-visible:ring-indigo-500 placeholder:text-zinc-600 text-white shadow-inner" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300 font-medium tracking-wide">Message *</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell me about your project..." className="bg-zinc-900/50 border-white/10 min-h-[160px] rounded-2xl focus-visible:ring-indigo-500 placeholder:text-zinc-600 text-white shadow-inner resize-none pt-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-white hover:bg-zinc-200 text-zinc-950 font-bold rounded-2xl gap-3 text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          {isSubmitting ? "Redirecting..." : "Send via WhatsApp"}
          <Send size={20} />
        </Button>
      </form>
    </Form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="text-zinc-500">Loading form...</div>}>
      <ContactFormContent />
    </Suspense>
  );
}
