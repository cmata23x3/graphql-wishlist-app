import { schema } from "../../../graphql/schema"
import { context } from "../../../graphql/context"
import { NextApiRequest, NextApiResponse } from "next"
import { createYoga } from "graphql-yoga"

export default createYoga<{
    req: NextApiRequest
    res: NextApiResponse
}>({
    schema,
    context,
    graphqlEndpoint: '/api/graphql'
})