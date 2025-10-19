"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const seedData_1 = require("./utils/seedData");
// Load environment variables
dotenv_1.default.config();
// Run the seeder
(0, seedData_1.seedDatabase)();
//# sourceMappingURL=seed.js.map