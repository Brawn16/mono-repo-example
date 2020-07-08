# nucleus-monorepo

## Description

Monorepo for SDH Nucleus project.

## Requirements

- NodeJS, v12.9 < v13 (LTS, 12.9 onwards supports ES2020 natively)
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

This repo contains multiple packages used together to build up the complete app, managed through Yarn Workspaces. For more information of workspaces read https://classic.yarnpkg.com/en/docs/workspaces.

## Packages

### Nucleus Frontend

The frontend package provides the frontend for the Nucleus app, using Next.js as the framework (https://nextjs.org).

The following commands are available:

- `build` - Creates a production-ready static bundle
- `dev` - Runs local development environment

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
