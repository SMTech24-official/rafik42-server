import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { ContractServices } from "./contract.service";

const createContract = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await ContractServices.createContractIntoDb(req.body, id);
  sendResponse(res, {
    message: "Contract Created successfully!",
    data: result,
  });
});

// get all Contract form db
const getContracts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContractServices.getContractsFromDb();
  sendResponse(res, {
    message: "Contracts retrieved successfully!",
    data: result,
  });
});

export const ContractControllers = {
  createContract,
  getContracts,
};
