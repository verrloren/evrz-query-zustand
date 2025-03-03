"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, CreateStyleGuideFormData, createStyleGuideSchema, CustomInput } from "@/shared";
import { createStyleGuideAction } from "@/features/styleguides";


export function StyleguideCreateForm() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStyleGuideFormData>({
    resolver: zodResolver(createStyleGuideSchema),
  });

  const onSubmit = async (data: CreateStyleGuideFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value);
			})
      console.log("before fetching", formData);

			const res = createStyleGuideAction(formData);

			console.log("response:", res)

      setIsSubmitting(false);

    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-y-4 xl:gap-y-6"
    >
      <h5 className="text-5xl sm:text-6xl xl:text-7xl pb-6 font-bold text-center text-white">
        Create your custom <br/> Style Guide
      </h5>
			{/* NAME */}
      <CustomInput
        {...register("styleGuideName")}
        placeholder="Style guide name"
        name="styleGuideName"
        variant="outline"
      />
      {errors.styleGuideName && (
        <p className="text-red-500 text-sm">{errors.styleGuideName.message}</p>
      )}

      <textarea
        {...register("architectureErrors")}
        placeholder="Architecture preferences..."
        name="architectureErrors"
        className="w-full	 text-neutral-50 p-2
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
				placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.architectureErrors && (
        <p className="text-red-500 text-sm">
          {errors.architectureErrors.message}
        </p>
      )}


      <textarea
        {...register("packageErrors")}
        placeholder="Package settings..."
        name="packageErrors"
        className="w-full p-2 text-neutral-50
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
				placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.packageErrors && (
        <p className="text-red-500 text-sm">
          {errors.packageErrors.message}
        </p>
      )}
			
      <textarea
        {...register("structureErrors")}
        placeholder="Structure preferences..."
        name="structureErrors"
        className="w-full p-2 text-neutral-50
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
				placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.structureErrors && (
        <p className="text-red-500 text-sm">
          {errors.structureErrors.message}
        </p>
      )}

      <textarea
        {...register("namingErrors")}
        placeholder="Naming preferences..."
        name="namingErrors"
        className="w-full p-2 text-neutral-50
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
			placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.structureErrors && (
        <p className="text-red-500 text-sm">
          {errors.structureErrors.message}
        </p>
      )}

      <textarea
        {...register("styleErrors")}
        placeholder="Style preferences..."
        name="styleErrors"
        className="w-full p-2 text-neutral-50
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
			placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.structureErrors && (
        <p className="text-red-500 text-sm">
          {errors.structureErrors.message}
        </p>
      )}

      <textarea
        {...register("standartsErrors")}
        placeholder="Standarts preferences..."
        name="standartsErrors"
        className="w-full p-2 text-neutral-50
				transition-colors bg-black rounded-2xl font-poppins
				font-light z-40 border border-neutral-800 hover:border-neutral-400 
				placeholder:text-neutral-400 focus:border-neutral-400"
      />
      {errors.standartsErrors && (
        <p className="text-red-500 text-sm">
          {errors.standartsErrors.message}
        </p>
      )}

      <Button
        className="w-full h-12"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Submit"}
      </Button>
    </motion.form>
  );
}
