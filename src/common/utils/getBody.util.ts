export const getRequestBody = (req: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk: any) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });

    req.on("error", (err: any) => {
      reject(err);
    });
  });
};
