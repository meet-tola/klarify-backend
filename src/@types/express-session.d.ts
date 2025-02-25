import session from "cookie-session";

declare global {
  namespace Express {
    interface Request {
      session: session.CookieSessionObject;
    }
  }
}
