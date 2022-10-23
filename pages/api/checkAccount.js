import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const jsonDirectory = path.join(process.cwd(), "DB");
    let DB = await fs.readFile(jsonDirectory + "/users.json", "utf-8");
    DB = JSON.parse(DB);

    const body = req.body;
    console.log(body);

    if (DB[body.ID] && DB[body.ID].PW == body.PW) {
      console.log(2);
      res.status(201).json(JSON.stringify({ msg: "true" }));
    } else {
      res.status(201).json(JSON.stringify({ msg: "false" }));
    }
  }
}
