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

import { PasswordInput } from "@/components/auth/Password-Input";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { userProfileInfo } from "@/api/query";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name must be 1 words.")
    .max(20, "First Name must be 20 words.")
    .regex(/^[A-Za-z]+$/, "First Name must be words"),
  lastName: z
    .string()
    .min(1, "Second Name must be 1 words.")
    .max(20, "Second Name must be 20 words.")
    .regex(/^[A-Za-z0-9]+$/, "Second Name must be words"),
  password: z
    .string()
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers"),
});

export default function ChangeUserNamePage() {
  const { data: user } = useQuery(userProfileInfo());
  const actionData = useActionData() as { error?: string; message?: string };
  const submit = useSubmit();
  const navigation = useNavigation();

  // console.log("actionData of ChangeNamePage >>>", actionData);

  const isSubmitting = navigation.state === "submitting";

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // console.log(
    //   "onSubmit >>>",
    //   values.firstName,
    //   values.lastName,
    //   values.password,
    // );

    submit(values, {
      method: "POST",
      action: "/settings/change-username",
    });
    // console.log(values);
  }

  return (
    <div className={"mx-8 my-4 flex flex-col gap-6"}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <span className="sr-only">Change User Name</span>
          </Link>
          <h1 className="text-xl font-bold">Change User Name</h1>
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name{" "}
                        {actionData && (
                          <p className="text-xs text-red-400">
                            {actionData?.message}
                          </p>
                        )}
                      </FormLabel>
                      <span className="sr-only">First Name</span>
                      <FormControl>
                        <Input
                          required
                          type={"text"}
                          className={"pr-10"}
                          minLength={2}
                          maxLength={20}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <span className="sr-only">Last Name</span>
                      <FormControl>
                        <Input
                          required
                          type={"text"}
                          className={"pr-10"}
                          minLength={2}
                          maxLength={20}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <span className="sr-only">Your Password</span>
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

                <Link
                  to="/reset"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>

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
