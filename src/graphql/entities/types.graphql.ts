export const types = `
  type Competition {
    _id: ID!
    name: String!
    code: String!
    areaName: String!
  }

  type Team {
    _id: ID!
    name: String!
    tla: String!
    shortName: String!
    areaName: String!
    address: String!
    competitions: [Competition!]!
    players: [Player!]
    coach: Coach
  }

  type Player {
    _id: ID!
    name: String!
    position: String!
    dateOfBirth: String!
    nationality: String!
  }

  type Coach {
    _id: ID!
    name: String
    dateOfBirth: String
    nationality: String
  }
`;