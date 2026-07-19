"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormValues } from "../schemas/login.schema";

import { TextInput } from "@/components/forms/text-input";
import { AppButton } from "@/components/common/app-button";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <TextInput
        id="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <TextInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <AppButton
        type="submit"
        loading={isSubmitting}
      >
        Sign In
      </AppButton>
    </form>
  );
}