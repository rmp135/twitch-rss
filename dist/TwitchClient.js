"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var NetworkTasks = __importStar(require("./NetworkTasks"));
var default_1 = /** @class */ (function () {
    function default_1(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Fetches a single Twitch user by username.
     * @param username The username of the Twitch user to fetch.
     * @returns The Twitch user details.
     */
    default_1.prototype.GetSingleUserID = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.CheckLogin()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, NetworkTasks.Get('users', { login: username }, this.clientId, this.accessToken)];
                    case 2:
                        response = _a.sent();
                        if (response.data.length != 1) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, response.data[0]];
                }
            });
        });
    };
    /**
     * Fetches 20 archived videos of a given user.
     * @param userid The Twitch user ID to fetch videos for.
     * @returns The first 20 videos of the given user.
     */
    default_1.prototype.GetVideosForUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.CheckLogin()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, NetworkTasks.Get('videos', { user_id: userid, 'type': 'archive' }, this.clientId, this.accessToken)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * Fetches 100 users that a given user follows.
     * @param userid The Twitch user ID to fetch who they follow.
     * @returns The first 100 users that the given user follows.
     */
    default_1.prototype.GetUserFollows = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.CheckLogin()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, NetworkTasks.Get('users/follows', { from_id: userid, first: "100" }, this.clientId, this.accessToken)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * Checks that we are logged in, if not, logs in.
     */
    default_1.prototype.CheckLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.accessToken == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Login()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logs in to Twitch, storing the access_token in this Client instance.
     */
    default_1.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetworkTasks.Login(this.clientId, this.clientSecret)];
                    case 1:
                        loginResponse = _a.sent();
                        this.accessToken = loginResponse.access_token;
                        return [2 /*return*/];
                }
            });
        });
    };
    return default_1;
}());
exports["default"] = default_1;
