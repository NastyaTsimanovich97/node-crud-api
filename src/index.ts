import { createServer as createServerHttp } from "node:http";
import "dotenv/config";

import { UserService } from "./api/users";
import { HashI } from "./common/interfaces/hash.interface";
import { isUUID } from "./common/utils/isUuid.util";

const hash: HashI = {
  users: {},
};

const server = createServerHttp(async (req, res) => {
  const { url, method } = req;

  const userService = new UserService(hash);

  // TODO: resolve Error: write after end
  let body: any = [];
  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      console.log("url", url);
      console.log("method", method);
      console.log("body", body);

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;

      try {
        const urlParts = url?.split("/");
        const entityName = urlParts?.[2];
        const userId = urlParts?.[3];

        if (entityName === "users" && userId) {
          if (!isUUID(userId)) {
            res.statusCode = 400;
            res.write(JSON.stringify({ message: "User id is invalid" }));
            res.end();
          }

          const data = userService.getById(userId);

          if (!data) {
            res.statusCode = 404;
            res.write(JSON.stringify({ message: "User not found" }));
            res.end();
          }

          if (method === "GET") {
            res.statusCode = 200;
            res.write(JSON.stringify({ data }));
          } else if (method === "PUT") {
            const userData = JSON.parse(body);
            const errors = userService.validateData(userData);

            if (errors.length) {
              res.statusCode = 404;
              res.write(JSON.stringify({ errors }));
              res.end();
            }

            const result = userService.update(userId, userData);
            res.statusCode = 200;
            res.write(JSON.stringify({ data: result }));
          } else if (method === "DELETE") {
            userService.delete(userId);
            res.statusCode = 204;
          }
        } else if (entityName === "users") {
          if (method === "GET") {
            const data = userService.getAll();
            res.write(JSON.stringify({ data }));
          } else if (method === "POST") {
            const userData = JSON.parse(body);
            const errors = userService.validateData(userData);

            if (errors.length) {
              res.statusCode = 404;
              res.write(JSON.stringify({ errors }));
              res.end();
            }

            const data = userService.create(userData);
            res.statusCode = 201;
            res.write(JSON.stringify({ data }));
          }

          res.end();
        } else {
          console.error("Url path not found");
          res.statusCode = 404;
          res.write(JSON.stringify({ message: "Url path not found" }));
        }

        res.end();
      } catch (error: any) {
        console.error(error.message);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ message: `Internal server error. ${error.message}` })
        );
        res.end();
      }
    });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});
