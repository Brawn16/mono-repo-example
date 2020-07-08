import { gql } from "apollo-server-core";
import { getConnection } from "typeorm";
import { UserEntity } from "../shared/entity/user.entity";
import { createClient } from "./helpers/client";

afterAll(async () => getConnection().close());

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      user {
        email
      }
    }
  }
`;

it("returns current user", async () => {
  const { query } = await createClient();

  const result = await query({
    query: gql`
      query {
        currentUser {
          email
        }
      }
    `
  });

  expect(result).toMatchSnapshot();
});

it("logs in with valid password", async () => {
  const { mutate } = await createClient();

  const result = await mutate({
    mutation: LOGIN,
    variables: {
      email: "admin@localhost.local",
      password: "password"
    }
  });

  expect(result).toMatchSnapshot();
});

it("cannot login with invalid password", async () => {
  const { mutate } = await createClient();

  const result = await mutate({
    mutation: LOGIN,
    variables: {
      email: "admin@localhost.local",
      password: "invalid"
    }
  });

  expect(result).toMatchSnapshot();
});

it("cannot login with blank password", async () => {
  const { mutate } = await createClient();

  const user = await UserEntity.findOneOrFail({
    email: "admin@localhost.local"
  });
  user.password = "";
  user.loadCurrentPassword();
  await user.save();

  const result = await mutate({
    mutation: LOGIN,
    variables: {
      email: "admin@localhost.local",
      password: ""
    }
  });

  expect(result).toMatchSnapshot();
});

it("cannot login with inactive user", async () => {
  const { mutate } = await createClient();

  await UserEntity.update(
    { email: "admin@localhost.local" },
    { isActive: false }
  );

  const result = await mutate({
    mutation: LOGIN,
    variables: {
      email: "admin@localhost.local",
      password: "password"
    }
  });

  expect(result).toMatchSnapshot();
});

it("cannot login with unverified user", async () => {
  const { mutate } = await createClient();

  await UserEntity.update(
    { email: "admin@localhost.local" },
    { isVerified: false }
  );

  const result = await mutate({
    mutation: LOGIN,
    variables: {
      email: "admin@localhost.local",
      password: "password"
    }
  });

  expect(result).toMatchSnapshot();
});
