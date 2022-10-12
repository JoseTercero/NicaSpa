import { connect } from "mongoose"; // Import the mongoose module
import { MONGODB_URI } from "./config";

(async () => {
  // Create a new async function
  try {
    const db = await connect(MONGODB_URI); // Connect to the database
    console.log(
      "DB is connected to",
      db.connection.host,
      "at port",
      db.connection.port,
      "with data base",
      db.connection.name
    ); // Print the connection details to the console
  } catch (error) {
    console.log(error);
  }
})();
