import path from 'path';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
// import { Parking } from "./interface";
import { addParking, getAllParkings, deleteParking } from './db/mongo';

const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(express.static(root));

app.post("/park", (req: Request, res: Response) => {
  addParking(req.body);
  res.send("got the request!")
})

app.delete("/park", (req: Request, res: Response) => {
  const id = req.body.id
  deleteParking(id).then(() => res.send("deleted successfully"))
})

//@ts-ignore
app.get("/park", (req: Request, res: Response) => {
  getAllParkings().then(documents => res.send(documents))
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
