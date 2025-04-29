import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserType } from "@prisma/client";
import { ExpenseController } from "./expense.controller";
import { fileUploader } from "../../../helpars/fileUploader";
import { ExpenseValidation } from "./expense.validation";

const router = express.Router();

router
  .route("/")
  .get(ExpenseController.getExpenses)
  .post(
    auth(UserType.Landlord, UserType.Agency),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(ExpenseValidation.CreateExpenseValidationSchema),
    ExpenseController.createExpense
  );

router.route("/:id").get(ExpenseController.getSingleExpenses);

export const ExpenseRoutes = router;
