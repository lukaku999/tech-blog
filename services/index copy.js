import {request, gql} from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            
            postsConnection {
                edges {
                        node {
                                author {
                                bio
                                name
                                id
                                photo {
                                    url
                                }
                            }
                            createdAt
                            slug
                            title
                            excerpt
                            featuredimage {
                                url
                            }
                            categories {
                                slug
                                name
                            }
                        }
                }
            }
              
        }
    `

    const result = await request(graphqlAPI, query)
    
    return result.postsConnection.edges
}

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(orderBy: createdAt_ASC, last: 3) {
                title
                featuredimage{
                    url
                }
                createdAt
                slug

            }
            
        }
    `
    const result = await request(graphqlAPI, query)
    
    return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
    //dont display all the current slug, but display post of the same category
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(where: {slug_not: $slug, AND: {categories_some:{slug_in: $categories}}}
                  last:3) 
                   {
                        title
                        featuredimage{
                            url
                        }
                        createdAt
                        slug

                    }
            
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug})
    
    return result.posts
}


export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
                navigation
            }
        }
    `
    const result = await request(graphqlAPI, query)
    
    return result.categories
}


export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}) {
              
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                excerpt
                featuredimage {
                    url
                }
                categories {
                    slug
                    name
                }
                content {
                    raw
                }
                   
            }
              
        }
    `

    const result = await request(graphqlAPI, query, {slug})
    
    return result.post
}