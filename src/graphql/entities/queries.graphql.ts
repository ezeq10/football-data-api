export const queries = `
  type Query {
    players(leagueCode: String!, teamName: String): [Player]
    team(name: String!): Team
  }
`;