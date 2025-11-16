import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./Password-Input";
import { useState } from "react";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
  confirmPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
});

export default function NewPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [clientError, setClientError] = useState<string | null>(null);
  const actionData = useActionData() as { error?: string; message?: string };
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("onSubmit >>>", values.password, values.confirmPassword);
    if (values.password !== values.confirmPassword) {
      setClientError("New Password do not match");
      return;
    }

    setClientError(null);
    submit(values, {
      method: "POST",
      action: "/reset/new-password",
    });
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="sr-only">New Password</span>
          </Link>
          <h1 className="text-xl font-bold">Change new password</h1>
          <div className="text-center text-sm">
            Password must be 8 digits long abd contain only numbers.They must
            match.
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off"
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <span className="sr-only">New Password</span>
                      <FormControl>
                        <PasswordInput
                          required
                          inputMode="numeric"
                          minLength={8}
                          maxLength={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <span className="sr-only">Confirm New Password</span>
                      <FormControl>
                        <PasswordInput
                          required
                          inputMode="numeric"
                          minLength={8}
                          maxLength={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {actionData && (
                  <div className="flex gap-2">
                    <p className="text-xs text-red-400">
                      {actionData?.message}
                    </p>
                    <Link
                      to={"/login"}
                      className="text-xs underline underline-offset-4"
                    >
                      Go back to Login
                    </Link>
                  </div>
                )}
                {clientError?.length && (
                  <p className="text-xs text-red-400">{clientError}</p>
                )}
                <div className="grid gap-4">
                  <Button type="submit" className="mt-4 w-full">
                    {isSubmitting ? "Submitting..." : "Change"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
