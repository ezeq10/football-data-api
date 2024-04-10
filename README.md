# Football Data API Integration

We'll be hitting Football Data API (API v4) to populate the data locally and then expose it.

## Technologies Used

- TypeScript
- MongoDB
- Apollo GraphQL
- Docker Compose

## Description

This project aims to integrate data from the Football Data API into a local database using TypeScript, MongoDB, and Apollo GraphQL. By hitting the Football Data API, we'll retrieve football-related information such as matches, teams, players, and more. This data will be stored in a MongoDB database locally. We'll then expose this data through a GraphQL API implemented with Apollo Server, allowing for flexible and efficient querying of the football data. The project will be containerized using Docker Compose for easy deployment and management of the development environment.

## Why MongoDB

MongoDB offers several advantages over traditional relational databases:

- **Automatic Schema**: MongoDB's flexible schema allows for schemaless data storage, eliminating the need to define a schema upfront. This provides greater flexibility and agility, especially in projects where data models may evolve frequently.

- **Flexibility**: MongoDB's document-oriented model and support for JSON-like data make it well-suited for projects dealing with unstructured or semi-structured data. This flexibility simplifies data storage and manipulation, especially for projects with varying data structures.

- **JSON Data Handling**: MongoDB natively stores data in a JSON-like format (BSON), making it easy to work with JSON data without the need for complex mappings between relational data and JSON structures.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

`git clone https://github.com/ezeq10/football-data.git`
  
`cd your-repo`

2. Obtain an API token from [football-data.org](https://www.football-data.org/) and create a `.env` file in the root directory of the project. You can use the env.sample file to do this. Add your API token to the `.env` file:

`API_TOKEN=your-api-token`

3. Start the project with Docker Compose:

`docker-compose up`

## Notes

- The Docker Compose configuration includes services for MongoDB, Apollo Server, and any other necessary services.
- Ensure Docker is installed and running on your system before starting the project.
- Once the project is running, you can access the GraphQL API at http://localhost:4000/graphql.

