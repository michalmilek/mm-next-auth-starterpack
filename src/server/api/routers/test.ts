import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const testRouter = createTRPCRouter({
  getProtectedData: protectedProcedure.query(() => {
    return {
      message: "This is protected data that should only be accessible when logged in!",
      timestamp: new Date().toISOString(),
    };
  }),
}); 