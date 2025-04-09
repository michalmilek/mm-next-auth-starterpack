import { handlers } from "@/server/auth";

// Export the GET and POST handlers for NextAuth.js
export const { GET, POST } = handlers;

// Add debug logging
console.log("NextAuth.js route handlers exported");
