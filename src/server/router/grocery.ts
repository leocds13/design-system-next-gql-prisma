import { z } from "zod";
import { procedure } from "../trpc";

export const groceryRouter = {
	groceries: procedure.query(async ({ ctx }) => {
		return await ctx.prisma.groceryList.findMany();
	}),
	createGrocery: procedure
		.input(
			z.object({
				title: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			return await ctx.prisma.groceryList.create({
				data: {
					title: input.title,
				},
			});
		}),
	updateGrocery: procedure
		.input(
			z.object({
				id: z.number(),
				title: z.string(),
				checked: z.boolean(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { id, ...rest } = input;

			return await ctx.prisma.groceryList.update({
				where: { id },
				data: { ...rest },
			});
		}),
	deleteAllGroceries: procedure
		.input(
			z.object({
				ids: z.number().array(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { ids } = input;

			return await ctx.prisma.groceryList.deleteMany({
				where: {
					id: {
						in: ids,
					},
				},
			});
		}),
};

export type GrouceryRouterType = typeof groceryRouter;
