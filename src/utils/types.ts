import { Request } from "express";

export enum LogTypes {
  Network = "NETWORK",
  System = "SYSTEM",
}
export interface SessionDocument {
  id?: string;
  login_time?: string;
  user_agent: string;
  ip_address: string;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}
export type SessionBody = Pick<SessionDocument, "user_agent" | "ip_address">;
export interface ProfileDocument {
  id?: string;
  auth_id?: AuthDocument["id"];
  first_name: string;
  last_name: string;
  display_name: string;
  avatar: string;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}
export type ProfileBody = Pick<ProfileDocument, "first_name" | "last_name" | "display_name" | "avatar" | "auth_id">;
export enum AuthDocumentTypeEnum {
  Email = "EMAIL"
}
export interface AuthDocument {
  id?: string;
  email: string;
  password: string;
  type?: AuthDocumentTypeEnum;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
}
export type AuthBody = Pick<AuthDocument, "email" | "password">;
export type RegisterBody = AuthBody & ProfileBody;
export interface ResponsesOptions {
  statusCode?: number;
  errors?: { path: string, message: string }[]
  log?: string
}
export interface CustomRequest extends Request {
  user?: AuthDocument & ProfileDocument;
}
export interface UserAuthJwtPayload {
  uid: AuthDocument["id"]
}