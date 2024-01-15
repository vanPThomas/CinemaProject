const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const striptags = require("striptags");

const prisma = new PrismaClient();

// Utility function to truncate a string to a specified length
function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) : str;
}

async function insertDataIntoDatabase(data) {
  try {
    for (const movie of data) {
      const { title, year, cast, genres, extract, thumbnail } = movie;

      // Truncate description to a certain length (e.g., 255 characters) before removing HTML tags
      const truncatedDescription = truncateString(extract, 255);

      // Remove HTML tags from the truncated description
      const cleanedDescription = striptags(truncatedDescription);
      console.log("Cleaned Description Length:", cleanedDescription.length);
      await prisma.film.create({
        data: {
          title,
          year,
          cast: cast.join(", "), // Join the cast array by commas
          genre: genres.join(", "), // Join the genres array by commas
          description: extract.substring(0, 100), // Insert the first 100 characters
          poster: thumbnail,
        },
      });
    }

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Read movies.json file
const moviesFilePath = "./movies.json";
try {
  const jsonData = JSON.parse(fs.readFileSync(moviesFilePath, "utf8"));

  // Call the function to insert data into the database
  insertDataIntoDatabase(jsonData);
} catch (error) {
  console.error("Error reading movies.json:", error);
}
