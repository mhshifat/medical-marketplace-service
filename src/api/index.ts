import { Router } from "express";
import { API_ROUTES } from './modules';

export function Routes() {
  const router = Router();

  Object.keys(API_ROUTES).map((item) => router.use(item, API_ROUTES[item as keyof typeof API_ROUTES]))

  return router;
}