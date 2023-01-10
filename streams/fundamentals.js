import { Readable, Writable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10);
    callback();
  }
}

new OneToHundredStream().pipe(new MultiplyByTenStream());
