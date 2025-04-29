import { hash } from "bcryptjs";

const plainTextPassword = "admin123";
const saltRounds = 10;

async function hashPassword(password) {
  try {
    const hashedPassword = await hash(password, saltRounds);
    console.log("Plain Text Password:", password);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword(plainTextPassword);
