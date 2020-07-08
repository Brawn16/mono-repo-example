import { gql } from "apollo-server-core";
import { getConnection } from "typeorm";
import { UserEntity } from "../shared/entity/user.entity";
import { createClient } from "./helpers/client";

afterAll(async () => getConnection().close());

it("returns all users", async () => {
  const { query } = await createClient();

  const result = await query({
    query: gql`
      query {
        users {
          email
        }
      }
    `
  });

  expect(result).toMatchSnapshot();
});

it("returns single user", async () => {
  const { query } = await createClient();
  const { id } = await UserEntity.findOneOrFail({
    email: "admin@localhost.local"
  });

  const result = await query({
    query: gql`
      query user($id: String!) {
        user(id: $id) {
          email
        }
      }
    `,
    variables: { id }
  });

  expect(result).toMatchSnapshot();
});

it("creates a user", async () => {
  const { mutate } = await createClient();

  const result = await mutate({
    mutation: gql`
      mutation createUser($data: CreateUserInput!) {
        createUser(data: $data) {
          email
        }
      }
    `,
    variables: {
      data: {
        email: "new@localhost.local",
        isActive: true,
        isVerified: true,
        password: "password"
      }
    }
  });

  expect(result).toMatchSnapshot();
});

it("updates a user", async () => {
  const { mutate } = await createClient();
  const { id } = await UserEntity.findOneOrFail({
    email: "admin@localhost.local"
  });

  const result = await mutate({
    mutation: gql`
      mutation updateUser($id: String!, $data: UpdateUserInput!) {
        updateUser(data: $data, id: $id) {
          email
        }
      }
    `,
    variables: {
      data: {
        email: "updated@localhost.local"
      },
      id
    }
  });

  expect(result).toMatchSnapshot();
});

it("deletes a user", async () => {
  const { mutate } = await createClient();
  const { id } = await UserEntity.findOneOrFail({
    email: "admin@localhost.local"
  });

  const result = await mutate({
    mutation: gql`
      mutation deleteUser($id: String!) {
        deleteUser(id: $id)
      }
    `,
    variables: { id }
  });

  expect(result).toMatchSnapshot();
});
