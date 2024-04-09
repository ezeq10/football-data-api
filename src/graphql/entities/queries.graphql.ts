export const queries = `
  type Query {
    players(leagueCode: String!): [Player]
    team(name: String!): Team
  }
`;