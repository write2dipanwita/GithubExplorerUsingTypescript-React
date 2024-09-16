export const getRepositoryDetails = `
  query ($repoId: ID!, $afterCursor: String, $beforeCursor: String, $last: Int, $first: Int) {
  node(id: $repoId) {
    ... on Repository {
      name
      description
      issues(
        last: $last
        first: $first
        after: $afterCursor
        before: $beforeCursor
        orderBy: {field: CREATED_AT, direction: DESC}
      ) {
        edges {
          node {
            id
            title
            createdAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
      owner {
        login
      }
    }
    id
  }
}


`;
