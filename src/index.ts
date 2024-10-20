import { createServer as createServerHttp } from "node:http";
import "dotenv/config";

const server = createServerHttp((req, res) => {
  // res.end("Request accepted");
  const { url } = req;

  console.log("url", url);

  try {
    switch (url) {
      case "/api/users":
        break;

      default:
        console.error("Url path not found");
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Url path not found" }));
        res.end();
    }
  } catch (error: any) {
    console.error(error.message);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({ message: `Internal server error. ${error.message}` })
    );
    res.end();
  }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});
