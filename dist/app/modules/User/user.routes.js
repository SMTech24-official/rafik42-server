"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// *!register user
router.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidation.CreateUserValidationSchema), user_controller_1.userController.createUser);
// *!get all  user
router.get("/", user_controller_1.userController.getUsers);
exports.userRoutes = router;
