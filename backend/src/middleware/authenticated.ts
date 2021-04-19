import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  // console.log({ isAuthenticated: req.isAuthenticated() });
  // console.log({ user: req.user });
  // console.log({ headers: req.headers });
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send();
}
