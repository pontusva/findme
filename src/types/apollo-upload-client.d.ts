declare module 'apollo-upload-client/public/index.js' {
  import { ApolloLink } from '@apollo/client'
  export function createUploadLink(options: any): ApolloLink
} 