import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { PasswordInput } from "@/components/auth/Password-Input";

const FormSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
  newConfirmPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
  currentPassword: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
});

export default function ChangePasswordPage() {
  const [clientError, setClientError] = useState<string | null>(null);
  const actionData = useActionData() as { error?: string; message?: string };
  const submit = useSubmit();
  const navigation = useNavigation();

  // console.log("actionData of ChangePasswordPage >>>", actionData);

  const isSubmitting = navigation.state === "submitting";

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newConfirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(
    //   "onSubmit >>>",
    //   values.currentPassword,
    //   values.newConfirmPassword,
    //   values.newPassword,
    // );
    if (values.newPassword !== values.newConfirmPassword) {
      setClientError("Password do not match");
      return;
    }

    setClientError(null);
    submit(values, {
      method: "POST",
      action: "/settings/change-password",
    });
    // console.log(values);
  }

  return (
    <div className={"mx-8 my-4 flex flex-col gap-6"}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <span className="sr-only">Change Password</span>
          </Link>
          <h1 className="text-xl font-bold">Change password</h1>
          <div className="text-center text-sm">
            Password must be 8 digits long abd contain only numbers.They must
            match.
          </div>
        </div>

        <div className="mx-12 mb-4 flex flex-col gap-6 lg:mx-24">
          <div className="grid gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="off"
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Current Password{" "}
                        {actionData && (
                          <p className="text-xs text-red-400">
                            {actionData?.message}
                          </p>
                        )}
                      </FormLabel>
                      <span className="sr-only">Current Password</span>
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
                  name="newPassword"
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
                  name="newConfirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <span className="sr-only">Confirm Password</span>
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

                {clientError?.length && (
                  <p className="text-xs text-red-400">{clientError}</p>
                )}
                <div className="grid gap-4">
                  <Button type="submit" className="mt-4 w-full">
                    {isSubmitting ? "Submitting..." : "Confirm"}
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
