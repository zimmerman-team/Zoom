[![CircleCI](https://circleci.com/gh/zimmerman-zimmerman/zoom-v2-ui.svg?style=svg&circle-token=41f4daf9d89b5f25efa5f455b6db87611527af85)](https://circleci.com/gh/zimmerman-zimmerman/zoom-v2-ui)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/732613b2d3df4672bd570f14247234fe)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zimmerman-zimmerman/zoom-v2-ui&amp;utm_campaign=Badge_Grade)

# ZOOM V2 UI

## About
Zoom makes data easy to use and understand. We use data visualizations to give the numbers meaning. Zoom is an open data platform that enables the collection and analysis of relevant information and the visualisation of the outcomes. Users of the platform remain owner of their data. Zoom does not contain any personal identifiable information.

The increased availability of data provides new opportunities to support sustainable development. In 2016, Aidsfonds started to explore how to make use of the availability of data to improve its information position in combating the Aids epidemic. In close cooperation with Leiden University and Zimmerman & Zimmerman, Zoom is developed in order to support Aidsfonds and its partners in realising this ambition.

See the public charts created with Zoom here: https://zoom.aidsfonds.nl/

## Requirements

| Name | Recommended version |
| ---  | --- |
| MongoDB | 4.0 |
| watchman(facebooks) | 4.7 |
| nodeJS | 12.6 |
| npm | 3.5 |
| yarn | 1.16 |

<a href="https://github.com/zimmerman-zimmerman/DUCT">DUCT</a>, the data mapping Django back-end required to operate data conversion.

## Set up

 * Start the mongodb service
 * Go to your project root folder('zoom-v2-ui')
 * run ```yarn install```
 * run ```yarn relay```
 * Create a file called '.env' and add these variables to it:
    ```
    NODE_PATH=src/app/
    REACT_APP_GRAPHQL_HOST=your_duct_api
    REACT_APP_BACKEND_HOST=your_duct_api
    REACT_APP_OIPA_HOST=https://yoda.oipa.nl
    REACT_APP_AUTH_CUSTOM_DOMAIN=your_auth0_custom_domain
    REACT_APP_AUTH_DOMAIN=your_auth0_normal_domain
    REACT_APP_WIKIPEDIA_API_HOST=https://en.wikipedia.org
    REACT_APP_PROJECT_URL=your_projects_url
    REACT_APP_CLIENT_ID=your_auth0_client_id
    REACT_APP_AE_API_CLIENT_ID=your_auth0_AE_api_client_id
    REACT_APP_AE_API_CLIENT_SECRET=your_auth0_AE_api_client_secret
    REACT_APP_AE_API_URL=your_auth0_AE_api_url
    REACT_APP_CYPRESS_baseUrl=your_projects_url
    REACT_APP_CYPRESS_USER=your_auth0_username_for_testing
    REACT_APP_CYPRESS_PASS=your_auth0_user_password_for_testing
    REACT_APP_POSTMARK_CLIENT_ID=your_postmark_clinet_id
    REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw
    REACT_APP_ENCRYPTION_SECRET=any_random_string
    ```
 * run ```yarn start``` . And your project shoud run at 'http://localhost:3000'


## Methodologies
### component-based development
Component-based software engineering (CBSE), also called as component-based development (CBD), is a branch of software engineering that emphasizes the separation of concerns with respect to the wide-ranging functionality available throughout a given software system.

### behavior driven development
Behavior Driven Development (BDD) is an Agile process designed to keep focus on stakeholder's value throughout the whole project. ... It is a way to do Test Driven Development (TDD) with clarity that can not be accomplished with Unit Testing. It is a way to describe and test functionality in (almost) natural language.

## Core
### react
A JavaScript library for building declarative component-based user interfaces
### redux
Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test
### relay
Relay is a JavaScript framework for building data-driven React applications powered by GraphQL, designed from the ground up to be easy to use, extensible and, most of all, performant. Relay accomplishes this with static queries and ahead-of-time code generation.
### express
Express is a light-weight web application framework to help organize your web application into an MVC architecture on the server side. You can use a variety of choices for your templating language.
### auth0
Auth0 provides authentication and authorization as a service. <a href="https://auth0.com"> More about auth0 </a>

## Styling
### grommet
grommet is a react-based framework that provides accessibility, modularity, responsiveness, and theming
### styled components
styled-components utilises tagged template literals to style your components. It removes the mapping between components and styles. This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it.
### storybook
Storybook is a UI development environment and playground for UI components. The tool enables users to create components independently and showcase components interactively in an isolated development environment.
### material ui
React components for faster and easier web development. Build your own design system, or start with Material Design.

## Code quality
### codacy
Codacy is an automated code analysis/quality tool that helps developers ship better software, faster. With Codacy, you get static analysis, cyclomatic complexity, duplication and code unit test coverage changes in every commit and pull request.
### eslint
### stylelint
A linter that helps you avoid errors and enforce conventions in your styles.

## Testing
### cypress
Cypress is a next generation front end testing tool built for the modern web.
### enzyme
Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

## CI/CD
### circle ci
CircleCI's continuous integration and delivery platform makes it easy for teams of all sizes to rapidly build and release quality software at scale.

## Performance
### lighthouse
Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, and more.
