
 export const getRepositoryListQuery = `
  query ($afterCursor: String, $beforeCursor: String, $first: Int, $last: Int) {
    search(
      query: "is:public"
      type: REPOSITORY
      first: $first
      last: $last
      after: $afterCursor
      before: $beforeCursor
    ) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
            stargazerCount
            issues {
              totalCount
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }


`;
