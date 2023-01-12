import { router } from "../trpc";
import { groceryRouter } from "./grocery";

export const appRouter = router({
  ...groceryRouter,
});

export type ServerRouter = typeof appRouter;
