import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import { StatusCodes } from "http-status-codes";

export const authVerify =
  (...requiredRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          statusCode: StatusCodes.UNAUTHORIZED,
          success: false,
          message: "You Are Not Authorized",
          data: null,
        });
        return;
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt.secret as Secret
      ) as JwtPayload;

      req.user = verifiedUser;
      const { role } = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        res.status(StatusCodes.FORBIDDEN).json({
          statusCode: StatusCodes.FORBIDDEN,
          success: false,
          message: "Forbidden",
          data: null,
        });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
  };
