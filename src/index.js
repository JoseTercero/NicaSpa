import app from "./app";
import "./database";
import "./config/passport";

async function main() {
  app.listen(app.get("port"));

  console.log("Server on port", app.get("port"));
  console.log("Enviroment", process.env);
}
main();
