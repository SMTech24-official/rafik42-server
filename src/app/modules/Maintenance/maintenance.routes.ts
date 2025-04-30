import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserType } from "@prisma/client";
import { MaintenanceValidation } from "./maintenance.validation";
import { MaintenanceController } from "./maintenance.controller";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

router
  .route("/")
  .get(MaintenanceController.getMaintenances)
  .post(
    auth(UserType.Tenant),
    fileUploader.uploadSingle,
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req.body.data);
      next();
    },
    validateRequest(MaintenanceValidation.CreateMaintenanceValidationSchema),
    MaintenanceController.createMaintenance
  );

router.get(
  "/property-maintenances/:id",
  MaintenanceController.getPropertyMaintenances
);

router
  .route("/:id")
  .get(MaintenanceController.getSingleMaintenances)
  .patch(
    auth(UserType.Agency, UserType.Landlord),
    MaintenanceController.markComleted
  );

export const MaintenanceRoutes = router;
