"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_TEST_USER = _a.POSTGRES_TEST_USER, ENV = _a.ENV;
console.log(ENV);
var connect;
if (!ENV || ENV === 'dev') {
    connect = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
if (ENV === 'test') {
    connect = {
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
var pool = new pg_1.Pool(connect);
pool.on('connect', function () {
    console.log(process.env.NODE_ENV + " environment config loaded, db connection established");
});
exports["default"] = pool;
