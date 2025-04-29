import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const numberOfInquiriesToCreate = 50;
  const inquiries = [];

  for (let i = 0; i < numberOfInquiriesToCreate; i++) {
    inquiries.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      companyName: faker.company.name(),
      country: faker.location.country(),
      jobTitle: faker.person.jobTitle(),
      jobDetails: faker.lorem.paragraphs(2),
    });
  }

  console.log(`Generated ${inquiries.length} fake inquiries.`);

  try {
    const result = await prisma.contactInquiry.createMany({
      data: inquiries,
    });
    console.log(`Seeded ${result.count} contact inquiries.`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
