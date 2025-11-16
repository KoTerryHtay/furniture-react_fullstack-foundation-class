import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  phone: z
    .string()
    .min(7, "Phone number is too short.")
    .max(12, "Phone number is too long.")
    .regex(/^\d+$/, "Phone number must be numbers"),
});

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const actionData = useActionData() as { error?: string; message?: string };
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.,

    submit(values, { method: "POST", action: "." });
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
            <span className="sr-only">Furniture Shop</span>
          </Link>
          <h1 className="text-xl font-bold">Reset Password</h1>
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign In
            </Link>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <span className="sr-only">Phone Number</span>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="0977*******"
                          required
                          inputMode="numeric"
                          minLength={7}
                          maxLength={12}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {actionData && (
                  <p className="text-xs text-red-400">{actionData?.message}</p>
                )}
                <div className="grid gap-4">
                  <Button type="submit" className="mt-4 w-full">
                    {isSubmitting ? "Submitting..." : "Reset"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
