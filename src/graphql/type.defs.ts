import { gql } from 'apollo-server-express';
import { types } from './entities/types.graphql';
import { queries } from './entities/queries.graphql';
import { mutations } from './entities/mutations.graphql';

const typeDefs = gql`
  ${types}
  ${queries}
  ${mutations}
`;

export default typeDefs;