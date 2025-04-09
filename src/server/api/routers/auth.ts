import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hash } from "bcrypt";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Hash the password
      const hashedPassword = await hash(input.password, 10);

      // Create the user
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),
}); 