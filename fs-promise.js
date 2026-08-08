import fs from "node:fs/promises"

const data = await fs.writeFile("TTT.txt", "Hello");
console.log(data);