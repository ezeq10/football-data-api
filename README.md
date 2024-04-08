# Football Data API Integration

We'll be hitting [Football Data API](http://www.football-data.org/) (API v4) to populate the data locally and then expose it.

## Technologies Used
- TypeScript
- MongoDB
- Apollo GraphQL
- Docker Compose

## Description
This project aims to integrate data from the Football Data API into a local database using TypeScript, MongoDB, and Apollo GraphQL. By hitting the Football Data API, we'll retrieve football-related information such as matches, teams, players, and more. This data will be stored in a MongoDB database locally. We'll then expose this data through a GraphQL API implemented with Apollo Server, allowing for flexible and efficient querying of the football data. The project will be containerized using Docker Compose for easy deployment and management of the development environment.
