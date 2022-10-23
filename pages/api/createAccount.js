import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    console.log(body);

    const jsonDirectory = path.join(process.cwd(), "DB");
    let DB = await fs.readFile(jsonDirectory + "/users.json", "utf-8");
    DB = JSON.parse(DB);

    console.log(DB);

    res.status(201).json(JSON.stringify({ msg: "got request!" }));
  }
}
