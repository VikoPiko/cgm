"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { createUser } from "@/lib/actions/user.actions";

const formSchema = authFormSchema;

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      address: "",
      firstName: "",
      lastName: "",
      city: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      state: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Data:", data);
      const newUser = await createUser(data);
      setUser(newUser);

      if (newUser) {
        console.log("User created successfully:", newUser);
        router.push("/"); // Navigate to a success page or another route
      } else {
        console.log("User not created");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user. Please try again.");
    }
  };

  return (
    <>
      <section className="flex h-screen w-full items-center justify-center bg-gray-100 -mt-10 dark:bg-[#121212] ">
        <div className="w-full max-w-[420px] p-6 bg-white shadow-md rounded-md dark:bg-[#363636]">
          <h1 className="text-blue-600 text-3xl font-bold text-center underline mb-4">
            Welcome!
          </h1>
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <CustomInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <CustomInput
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter your specific address"
              />
              <CustomInput
                control={form.control}
                name="city"
                label="City"
                placeholder="Enter your city"
              />
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="Example: NY"
                />
                <CustomInput
                  control={form.control}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Example: 11101"
                />
              </div>
              <div className="flex gap-4">
                <CustomInput
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                />
                <CustomInput
                  control={form.control}
                  name="ssn"
                  label="SSN"
                  placeholder="Example: 1234"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-transform ease-in-out transform hover:scale-105 shadow-lg inline-block will-change-transform "
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
