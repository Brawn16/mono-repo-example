# nucleus-monorepo

![Production Builds](https://github.com/sdh-project-services/nucleus-monorepo/workflows/Production%20Builds/badge.svg) [![Storybook](https://github.com/storybookjs/brand/blob/master/badge/badge-storybook.svg)](https://5f1d51b3b8aef40022482d07-wpwbblrwrk.chromatic.com)

## Description

Monorepo for SDH Nucleus project.

## Requirements

- NodeJS, v12.9 < v13 (LTS, 12.9 onwards supports ES2020 natively)
- PostgreSQL v12
- Yarn, v1 < v2 (For working with monorepo)

If you need multiple versions of NodeJS for different projects, consider using NVM/NVM-Windows:

- https://github.com/nvm-sh/nvm
- https://github.com/coreybutler/nvm-windows

Other versions may cause/mask issues, so it's important to be on a supported version.

## Installation

1. Make sure you have the correct version of NodeJS

2. Check Yarn is installed. If not, run:

   ```sh
   $ npm install -g yarn
   ```

3. Install packages:

   ```sh
   $ yarn install
   ```

   **NB:** Yarn is configured to use work workspaces, so all modules required by packages in the repo will also be installed.

## Workspaces

This repo contains multiple packages used together to build up the complete app, managed through Yarn Workspaces. For more information on workspaces read https://classic.yarnpkg.com/en/docs/workspaces.

## Packages

### Nucleus Backend

The frontend package provides the API backend for the Nucleus app, using Apollo Server as the framework (https://www.apollographql.com/docs/apollo-server).

The following commands are available:

- `build` - Creates a production-ready static bundle
- `build-schema` - Build database schema
- `dev` - Runs local development environment _(see setup instructions below)_
- `seed` - Seed database with dummy data
- `test` - Run test suite

#### Setup Development Environment

1. Make sure you have PostgreSQL installed.

2. Add the following database and credentials:

   - Username: `nucleus`
   - Password: `nucleus`
   - Database: `nucleus`

3. Run `build-schema` command. This will populate the database with all the required tables.

4. Run `seed` command. This will populate the database with dummy data.

You can then run the `dev` command to start the API environment.

### Nucleus Frontend

The frontend package provides the frontend for the Nucleus app, using Next.js as the framework (https://nextjs.org).

The following commands are available:

- `build` - Creates a production-ready static bundle
- `dev` - Runs local development environment
- `seed` - Seed database
- `test` - Run test suite

**NB:** _The frontend requires a working backend, so make sure the backend is running to use the frontend with errors._

### Nucleus UI

The UI package provides the standard component library, and is included in other Nucleus packages. Think of it as an in-house alternative to React Bootstrap and similar libraries.

The following commands are available:

- `build` - Build production distribution of UI components
- `build-storybook` - Build production storybook
- `dev` - Build components and watch for changes
- `storybook` - Run storybook for components
- `test` - Run test suite

## Contributing

To create a pull request, first create a branch.

- Stardard development - `feature/np-$id-$description`

  - e.g. `feature/np-41-date-picker`
  - Branch from develop, create pull request to develop

- Hotfix - `hotfix/np-$id-$description`

  - e.g. `hotfix/np-41-date-picker`
  - Branch from master, create pull request to develop **and master**

There is a standard template in use for pull requests. Make sure you do not skip the checklist!
