# Backstage

[![Build Status](https://travis-ci.com/dojot/backstage.svg?branch=master)](https://travis-ci.com/dojot/backstage) [![DeepScan grade](https://deepscan.io/api/teams/2714/projects/3991/branches/33559/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2714&pid=3991&bid=33559) [![CodeFactor](https://www.codefactor.io/repository/github/dojot/backstage/badge)](https://www.codefactor.io/repository/github/dojot/backstage)

This repository is a BFF (Back-end For Front-end). It consumes some Dojot services and wrap data together to make the front-end development easier.

Documentation for development: https://dojot.github.io/backstage/development/

## **Environment Variables**

| Key                               | Purpose                        | Default Value              | Valid Values |
| --------------------------------- | ------------------------------ | -------------------------- | ------------ |
| BS_PORT                           | Backstage port                 | 3005                       | Integer      |
| BS_LOG_CONSOLE_LEVEL              | Logging level                  | info                       | String       |
| BS_ENABLE_GRAPHQL_INTERFACE       | Enable GraphQL UI              | false                      | Boolean      |
| BS_BASE_URL                       | Backstage base URL             | http://localhost:8000      | String       |
| BS_GRAPHQL_BASE_URL               | Backstage graphql base url     | http://apigw:8000          | String       |
| BS_POSTGRES_PORT                  | Postgres port                  | 5432                       | Integer      |
| BS_POSTGRES_HOST                  | Postgres host                  | postgres                   | String       |
| BS_POSTGRES_USER                  | Postgres user                  | postgres                   | String       |
| BS_POSTGRES_PASSWORD              | Postgres password              | postgres                   | String       |
| BS_POSTGRES_DATABASE              | Postgres database              | dojot_dash_users           | String       |
| BS_KEYCLOAK_INTERNAL_URL          | Keycloak internal url          | http://apigw:8000/auth     | String       |
| BS_KEYCLOAK_EXTERNAL_URL          | Keycloak external url          | http://localhost:8000/auth | String       |
| BS_KEYCLOAK_CODE_CHALLENGE_METHOD | Keycloak code challenge method | S256                       | String       |
| BS_KEYCLOAK_CLIENT_ID             | Keycloak client id             | gui                        | String       |
| BS_SESSION_DOMAIN                 | Session domain                 | localhost                  | String       |
| BS_SESSION_SECRET                 | Session secret                 | secret                     | String       |
| BS_SESSION_PROXY                  | Session proxy                  | true                       | Boolean      |
| BS_SESSION_COOKIE_NAME            | Session cookie name            | dojot-backstage-cookie     | String       |
| BS_SESSION_COOKIE_HTTPS           | Session cookie https           | false                      | Boolean      |
