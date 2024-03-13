import { PrismaClient } from "@prisma/client";

/* 
export const db = new PrismaClient();
it works.

But Nextjs Hot reloads the server and it will create a new instance of PrismaClient for every request.

So, we need to create a global instance of PrismaClient and reuse it across all requests.

To do that, we can use the globalThis object to store the PrismaClient instance.

globalThis is a global object that is available in all environments, including Node.js and browsers.
*/

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
