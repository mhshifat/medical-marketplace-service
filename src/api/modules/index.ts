import { AuthRouter } from './auth';
import { SessionRouter } from './session';
import { ProfileRouter } from './profile';

export const API_ROUTES = {
  "/auth": AuthRouter,
  "/sessions": SessionRouter,
  "/profile": ProfileRouter,
}