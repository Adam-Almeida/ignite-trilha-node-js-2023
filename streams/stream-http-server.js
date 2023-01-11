import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullBody = Buffer.concat(buffers).toString();

  console.log(fullBody);

  return res.end(fullBody);
  // return req.pipe(new InverseNumberStream())
  // .pipe(res);
});

server.listen(3334, () => console.log("Server is running on port 3334"));
