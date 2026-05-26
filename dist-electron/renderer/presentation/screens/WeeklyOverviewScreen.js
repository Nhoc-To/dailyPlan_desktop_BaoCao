"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const WeeklyOverview_1 = __importDefault(require("../components/WeeklyOverview"));
const WeeklyOverviewScreen = ({ tasks, onTaskUpdated }) => {
    return ((0, jsx_runtime_1.jsx)("div", { style: { height: '100%', display: 'flex', flexDirection: 'column' }, children: (0, jsx_runtime_1.jsx)(WeeklyOverview_1.default, { tasks: tasks, onTaskUpdated: onTaskUpdated }) }));
};
exports.default = WeeklyOverviewScreen;
