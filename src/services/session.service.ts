import { Omit } from "lodash";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import SessionModel, {
  SessionDocument,
  SessionInput,
} from "../model/session.model";

export async function createSession(
  input: DocumentDefinition<Omit<SessionInput, "valid">>
) {
  const session = await SessionModel.create(input);
  return session;
}
export async function findSession(
  query: FilterQuery<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) {
  const session = await SessionModel.find(query, options);
  return session;
}
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: DocumentDefinition<Omit<SessionInput, "user" | "userAgent">>
) {
  return SessionModel.updateOne(query, update);
}
