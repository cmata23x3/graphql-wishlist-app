import { asNexusMethod, makeSchema, queryType, mutationType, objectType } from "nexus";
import * as path from 'path';
import { DateTimeResolver } from "graphql-scalars";

const DateTime = asNexusMethod(DateTimeResolver, 'DateTime')

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

    }
})

const Mutation = mutationType({
    definition(t) {

    },
})

export const schema = makeSchema({
    types: [Query, Mutation, DateTime, Item],
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
