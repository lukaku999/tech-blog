import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function comments(req, res) {


  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email : $email, comment: $comment, post: {connect: {slug: $slug}}}){id}
    }
  `

  try {
    const result = await graphQLClient.request(query, req.body)
    console.log(result)
    await graphQLClient.request(
      `mutation publishComment($id: ID!) {
        publishComment(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }`,
      { id: result.createComment.id }
    );
    res.status(200).send(result)
  }
  catch (err) {
    console.log(err)
  }
  
}