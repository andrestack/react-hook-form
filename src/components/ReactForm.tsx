"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

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

// type FormValues = {
//   name: string;
//   url: string;
//   description: string;
//   tags: string;
//   date: string;
// };

export default function ReactForm() {
  const {
    register,
    handleSubmit,
    setError,
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error("Tool has already been added");
    } catch (error) {
      setError("name", { message: "Tool has already been added" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="mx-auto w-1/2 border border-opacity-80 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="name">App Name</Label>
        <Input {...register("name")} type="text" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Label htmlFor="url">URL</Label>
        <Input {...register("url")} type="text" />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
        <Label htmlFor="description">What Does it Do?</Label>
        <Input {...register("description")} type="text" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <Label htmlFor="tags">Tags</Label>
        <Input {...register("tags")} type="text" />
        <Label htmlFor="date">Date Added</Label>
        <Input {...register("date")} type="date" />
        <Button
          disabled={isSubmitting}
          className="align-self-center px-10 gap-3 mt-8"
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
