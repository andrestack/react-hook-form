"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

const urlSchema = z.string().refine(
  (val) => {
    try {
      // Check if the URL is valid with or without the protocol
      new URL(val.startsWith("https://") ? val : `https://${val}`);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: "Please enter a valid URL",
  }
);

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  url: urlSchema,
  description: z.string().min(10, { message: "Description is required" }),
  tags: z.string().min(1, { message: "Tags are required" }),
  date: z.string().min(1, { message: "Date is required" }),
});

type FormValues = z.infer<typeof schema>;

export default function ReactForm() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      url: "",
      description: "",
      tags: "",
      date: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Randomly succeed or fail
    if (Math.random() > 0.5) {
      toast({
        title: "Success",
        description: "Tool has been successfully submitted.",
        variant: "default",
      });
      reset();
      setDate(undefined); // Reset the date state
    } else {
      toast({
        title: "Error",
        description: "Failed to submit the tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-fit">
      <form
        className="w-full max-w-md border border-opacity-80 p-6 shadow-lg shadow-black/30 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">App Name</Label>
            <Input {...register("name")} type="text" id="name" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="url">URL</Label>
            <Input {...register("url")} type="text" id="url" />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">What Does it Do?</Label>
            <Input {...register("description")} type="text" id="description" />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input {...register("tags")} type="text" id="tags" />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="date">Date Added</Label>
            {mounted && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        setValue("date", format(newDate, "yyyy-MM-dd"), {
                          shouldValidate: true,
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
        </div>

        <Button disabled={isSubmitting} className="w-full mt-6" type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </section>
  );
}
