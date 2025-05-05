
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/useStore";
import { getText } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { language } = useStore();
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  function onSubmit(data: FormValues) {
    console.log(data);
    // In a real app, you would send this data to your server
    
    // Show success toast
    toast({
      title: getText('contact.success', language),
      description: `${language === 'en' ? 'I will get back to you soon!' : 'En kısa sürede size döneceğim!'}`,
    });
    
    // Reset form
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getText('contact.name', language)}</FormLabel>
              <FormControl>
                <Input placeholder={language === 'en' ? "Your name" : "Adınız"} {...field} />
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
              <FormLabel>{getText('contact.email', language)}</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder={language === 'en' ? "your.email@example.com" : "email@ornek.com"} 
                  {...field} 
                />
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
              <FormLabel>{getText('contact.message', language)}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={
                    language === 'en' 
                      ? "How can I help you? Let me know about your project..." 
                      : "Nasıl yardımcı olabilirim? Projeniz hakkında bilgi verin..."
                  }
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">
          {getText('contact.send', language)}
        </Button>
      </form>
    </Form>
  );
}
