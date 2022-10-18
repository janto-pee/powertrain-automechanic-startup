import mongoose from "mongoose";
import config from "config";
import { log } from "./log";

export async function connect() {
  const dbURI = config.get<string>("dbURI");
  await mongoose.connect(dbURI);
  log.info("connected to db");
}
