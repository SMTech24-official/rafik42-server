import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidation } from "../User/user.validation";
import auth from "../../middlewares/auth";
import { authValidation } from "./auth.validation";
import { UserType } from "@prisma/client";

const router = express.Router();

// user login route
router.post(
  "/login",
  validateRequest(UserValidation.UserLoginValidationSchema),
  AuthController.loginUser
);

router.post("/social/login", AuthController.socialLogin); 

// user logout route
router.post("/logout", AuthController.logoutUser);

router.get("/profile", AuthController.getMyProfile);

router.put(
  "/change-password",
  auth(UserType.Agency, UserType.Landlord, UserType.Tenant),
  validateRequest(authValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/verify-otp", AuthController.verifyForgotPasswordOtp);
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
