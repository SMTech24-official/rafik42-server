import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import ApiError from "../../errors/ApiErrors";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import prisma from "../../shared/prisma";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      const { id } = verifiedUser;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Forbidden access");
      }

      req.user = verifiedUser as JwtPayload;
console.log(user.userType);
      if (roles.length && !roles.includes(user.userType!)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
