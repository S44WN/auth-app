"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //client side validation can always be bypassed, so we need to validate the data on the server side as well

  //validating the fields using zod schema
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  //1. getting email and password from the validated fields
  const { email, password, name } = validatedFields.data;

  //2. hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //3. checking if the email already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User with that email already exists" };
  }

  //4. creating the user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: send vrification email to the user

  return { success: "User Created!" };
};
