"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ShieldCheck,
  Sparkles,
  Flame,
  BrainCircuit,
  Smile,
  Grape,
  Dumbbell,
  Filter,
  WandSparkles,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Service definitions with icons
const croServices: {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "reverse_aging",
    label: "ด้านการย้อนวัย (Reverse Aging)",
    description: "การประเมินอายุชีวภาพ ความเสื่อมของร่างกาย",
    icon: Activity,
  },
  {
    id: "immunity",
    label: "ด้านภูมิคุ้มกัน",
    description:
      "การทำงานของภูมิคุ้มกัน ความต้านทานโรค และการฟื้นตัวของร่างกาย",
    icon: ShieldCheck,
  },
  {
    id: "skin_beauty",
    label: "ด้านผิวพรรณและความงาม",
    description:
      "สุขภาพผิว ความชุ่มชื้น ความยืดหยุ่น และความเปลี่ยนแปลงที่เห็นได้ชัด",
    icon: Sparkles,
  },
  {
    id: "energy_metabolism",
    label: "ด้านการเผาผลาญพลังงาน",
    description: "ระดับน้ำตาล ไขมัน และสมดุลการเผาผลาญในร่างกาย",
    icon: Flame,
  },
  {
    id: "brain_nervous_system",
    label: "ด้านสมองและระบบประสาท",
    description: "การทำงานของสมอง สมาธิ ความจำ และการตอบสนองทางประสาท",
    icon: BrainCircuit,
  },
  {
    id: "mental_health_stress_management",
    label: "ด้านสุขภาพจิตและการจัดการความเครียด",
    description: "ความผ่อนคลาย และความสมดุลทางอารมณ์",
    icon: Smile,
  },
  {
    id: "digestion_intestine",
    label: "ด้านการย่อยอาหารและลำไส้",
    description: "การย่อย การดูดซึม และสมดุลของจุลินทรีย์ในลำไส้",
    icon: Grape,
  },
  {
    id: "energy_physical_performance",
    label: "ด้านพลังงานและสมรรถภาพทางกาย",
    description: "ความแข็งแรง ความทนทาน และระดับพลังงานในชีวิตประจำวัน",
    icon: Dumbbell,
  },
  {
    id: "liver_detoxification",
    label: "ด้านการทำงานของตับและการล้างสารพิษ",
    description: "ความสามารถในการเผาผลาญและขับของเสียออกจากร่างกาย",
    icon: Filter,
  },
  {
    id: "special_services",
    label: "บริการพิเศษปรับแต่งตามความต้องการของคุณ",
    description: "แจ้งความต้องการ เราหาการทดสอบที่เหมาะกับสินค้าของคุณ",
    icon: WandSparkles,
  },
];

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email address"),
  productInfo: z.string().min(1, "Product information is required"),
  budget: z.string().min(1, "Budget is required"),
  interestedServices: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one service.",
    }),
});

export function CROLeadForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactNumber: "",
      email: "",
      productInfo: "",
      budget: "",
      interestedServices: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const leadDataForDb = {
        ...values,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "croLeads"), leadDataForDb);

      router.push("/thank-you");
      form.reset();
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อผู้ประกอบการ</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เบอร์โทรติดต่อ</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 081-234-5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g., contact@company.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ข้อมูลผลิตภัณฑ์</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Describe your product, its purpose, and target audience..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>งบประมาณการทำ CRO (บาท)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="50000-100000">
                      50,000 - 100,000
                    </SelectItem>
                    <SelectItem value="100001-150000">
                      100,001 - 150,000
                    </SelectItem>
                    <SelectItem value="150001-200000">
                      150,001 - 200,000
                    </SelectItem>
                    <SelectItem value="200001-500000">
                      200,001 - 500,000
                    </SelectItem>
                    <SelectItem value="500001-1000000">
                      500,001 - 1,000,000
                    </SelectItem>
                    <SelectItem value="1000001">> 1,000,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interestedServices"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="font-headline text-base font-semibold">
                  บริการ CRO ที่สนใจ
                </FormLabel>
                <FormDescription>
                  Select one or more services you are interested in.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {croServices.map((service) => (
                  <FormField
                    key={service.id}
                    control={form.control}
                    name="interestedServices"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={service.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-colors hover:bg-accent/10"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      service.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== service.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="flex items-center gap-2 font-normal">
                              <service.icon className="h-5 w-5 text-primary" />
                              {service.label}
                            </FormLabel>
                            <FormDescription>
                              {service.description}
                            </FormDescription>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto"
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
