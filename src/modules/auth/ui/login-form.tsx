"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { ExclamationMark } from "./exclamation-mark";
import { LoginSchema } from "@/shared/schemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { login } from "@/modules/auth/login";
// import { useQueryClient } from "@tanstack/react-query";
// import { projectsApi, styleGuidesApi } from "@/modules/projects/api";
// import { getProjectsAction } from "@/modules/projects/get-projects-action";
// import { getStyleGuidesAction } from "@/modules/projects/get-style-guides-action";

export type LoginResponse = {
  success: boolean;
	response: string;
}

export default function LoginForm() {

  const router = useRouter();
  const [isPending, setTransition] = useTransition();
	// const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransition(async () => {
      try {
        const data: LoginResponse = await login(values);
				if ('error' in data) {
          toast.error(data.success);
          return;
        }
        if (data.success) {
					// await queryClient.prefetchQuery({
					// 	queryKey: [projectsApi.baseKey],
					// 	queryFn: getProjectsAction,
					// });
					// await queryClient.prefetchQuery({
					// 	queryKey: [styleGuidesApi.baseKey],
					// 	queryFn: getStyleGuidesAction,
					// });
					toast.success("Login successful!");
          router.push("/");
        } else {
          toast.error("Login failed!");
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error("Login failed!");
      }
    });
  };

  return (
    <>
		
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className=" z-20"
      >
				<h1 className="font-poppins text-7xl xl:text-8xl text-white">
          Welcome
        </h1>

      </motion.div>

      <Form {...form}>
        <form className="mt-8 z-20" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeInOut" }}
            className="w-[20rem] md:w-[25rem] z-20 xl:w-[30rem]  flex justify-center flex-col gap-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-2xl  border-none
											text-white text-lg placeholder:text-lg pl-4 py-6 border border-neutral-800
											bg-black transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="email"
                      placeholder="email"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-full rounded-2xl font-poppins border-none
											text-white text-lg placeholder:text-lg pl-4 py-6 border border-neutral-800
											bg-black transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-600 focus:bg-black focus:border-neutral-600"
                      disabled={isPending}
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <div className="flex flex-row items-end gap-x-2 mt-4">
                      <ExclamationMark />
                      <FormMessage className="text-xs  text-neutral-600" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* <FormError message={error || urlError} />
						<FormSuccess message={success} /> */}

            <Button
              disabled={isPending}
              className="w-full py-4 bg-neutral-100 hover:bg-white
							rounded-2xl h-12 text-xl text-black font-poppins border-none
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              Submit
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div
        className=" fixed flex items-center justify-center bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
      >
        <Link
          className="text-base font-semibold
					text-neutral-200 font-poppins
						hover:text-neutral-50 transition-colors duration-300"
          href="/auth/register"
        >
          create account
        </Link>
      </motion.div>
    </>
  );
}
