import express from "express";
import path from "node:path";

const __dirname = import.meta.dirname;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => console.log("listening on http://localhost:3000"));
