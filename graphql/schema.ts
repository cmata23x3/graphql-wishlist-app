import { asNexusMethod, makeSchema, queryType, mutationType, objectType, enumType, arg, nonNull, stringArg } from "nexus";
import * as path from 'path';
import { DateTimeResolver } from "graphql-scalars";

const DateTime = asNexusMethod(DateTimeResolver, 'DateTime')

const SortOrder = enumType({
    name: "SortOrder",
    members: ["asc", "desc"]
})

const Item = objectType({
    name: 'Item',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('title'),
        t.string('description'),
        t.string('url'),
        t.string('imageUrl'),
        t.field('createdAt', { type: 'DateTime'}),
        t.field('updatedAt', { type: 'DateTime' })
    }
})

const Query = queryType({
    definition(t) {
        t.list.field('getItems', {
            type: 'Item',
            args: {
                sortBy: arg({type: 'SortOrder'}),
            },
            resolve: async (_, args, ctx) => {
                return ctx.db.item.findMany({
                    orderBy: { createdAt: args.sortBy || undefined }
                })
            }
        })

        t.field('getOneItem', {
            type: 'Item',
            args: {
                id: nonNull(stringArg())
            },
            resolve: async (_, args, ctx) => {
                try {
                    return ctx.db.item.findUnique({ where: { id: args.id }})
                } catch (error) {
                    throw new Error(`${error}`)
                }
            }
        })
    }
})

const Mutation = mutationType({
    definition(t) {

    },
})

export const schema = makeSchema({
    types: [Query, Mutation, DateTime, Item, SortOrder],
    outputs: {
        schema: path.join(process.cwd(), 'graphql/schema.graphql'),
        typegen: path.join(process.cwd(), 'graphql/generated/nexus.d.ts'),
    },
    contextType: {
        module: path.join(process.cwd(), 'graphql/context.ts'),
        export: 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'db',
            }
        ]
    }
})
