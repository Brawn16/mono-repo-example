import { randomBytes, scrypt } from "crypto";

export function generateScryptHash(
  password: string,
  salt = randomBytes(32).toString("hex")
): Promise<{ hash: string; salt: string }> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, (error, key) => {
      if (error) {
        reject(error);
      }

      resolve({
        hash: key.toString("hex"),
        salt,
      });
    })
  );
}

export async function verifyScryptHash(
  password: string,
  storedHash: string,
  storedSalt: string
) {
  const { hash } = await generateScryptHash(password, storedSalt);
  return hash === storedHash;
}
