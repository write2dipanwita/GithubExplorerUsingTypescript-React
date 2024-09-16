import { CONFIG } from "../config/config";
import { GraphQLVariables } from "../Types";


  export const apiClient = (token: string, query: string, variables: GraphQLVariables = {}) => {
    return fetch(CONFIG.API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        query,
        variables,  
      }),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
    .then(result => {
      if (result.errors) {
        const errorMessages = result.errors.map((err: any) => err.message).join(', ');
      throw new Error(`GraphQL error: ${errorMessages}`);
      }
      return result.data;
    });
  };