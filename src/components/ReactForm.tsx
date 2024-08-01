"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormValues = {
  name: string;
  url: string;
  description: string;
  tags: string;
  date: string;
};

export default function ReactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="mx-auto w-1/2 border border-opacity-80 p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="name">App Name</Label>
        <Input
          {...register("name", { required: "App name is required" })}
          type="text"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Label htmlFor="url">URL</Label>
        <Input
          {...register("url", {
            required: "URL is required",
            validate: (value: any) => {
              if (!value.includes(".")) {
                return "Needs to be a valid URL";
              }
              return true;
            },
          })}
          type="text"
        />
        <Label htmlFor="description">What Does it Do?</Label>
        <Input
          {...register("description", {
            minLength: {
              value: 10,
              message: "Must be at least 10 characters",
            },
          })}
          type="text"
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        <Label htmlFor="tags">Tags</Label>
        <Input {...register("tags", { required: true })} type="text" />
        <Label htmlFor="date">Date Added</Label>
        <Input {...register("date", { required: true })} type="date" />
        <Button className="align-self-center px-10 gap-3 mt-8" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
