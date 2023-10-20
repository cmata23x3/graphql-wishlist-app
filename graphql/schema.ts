import { graphql } from "graphql";
import { makeSchema, queryType, mutationType } from "nexus";
import * as path from 'path';

const Query = queryType({
    definition(t) {

    }
})

const Mutation = mutationType({
    definition(t) {

    },
})

export const schema = makeSchema({
    types: [Query, Mutation],
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
