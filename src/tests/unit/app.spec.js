"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import lib and classes
 */
var app_1 = require("../../app/app");
describe('Test for ClsResolveDependency', function () {
    beforeAll(function (done) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // TODO: some operation before test started
            done();
            return [2 /*return*/];
        });
    }); });
    test('Scenario sending valid input object all dependent and independent entities ====>\n', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var objTest, inputJSON, expectSquenceEntitiesData, expectParallelEntitiesData, data;
        return __generator(this, function (_a) {
            objTest = new app_1.ClsResolveDependency();
            inputJSON = { 'A': ["B"], 'B': ["D", "C"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [] };
            expectSquenceEntitiesData = ['F', 'D', 'C', 'B', 'A'];
            expectParallelEntitiesData = ['E'];
            data = objTest.resolveDependency(inputJSON);
            expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
            expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
            expect(data.parallelEntities.length).toEqual(expectParallelEntitiesData.length);
            expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
            done();
            return [2 /*return*/];
        });
    }); });
    test('Scenario sending valid input object other non exits table like M,N and added P Independent entity ====>\n', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var objTest, inputJSON, expectSquenceEntitiesData, expectParallelEntitiesData, data;
        return __generator(this, function (_a) {
            objTest = new app_1.ClsResolveDependency();
            inputJSON = { 'A': ["B"], 'B': ["D", "C", "M", "N"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [], 'P': [] };
            expectSquenceEntitiesData = ['F', 'D', 'C', 'M', 'N', 'B', 'A'];
            expectParallelEntitiesData = ['E', 'P'];
            data = objTest.resolveDependency(inputJSON);
            expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
            expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
            expect(data.parallelEntities.length).toEqual(expectParallelEntitiesData.length);
            expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
            done();
            return [2 /*return*/];
        });
    }); });
    test('Scenario sending valid input object with all Independent entities ====>\n', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var objTest, inputJSON, expectSquenceEntitiesData, expectParallelEntitiesData, data;
        return __generator(this, function (_a) {
            objTest = new app_1.ClsResolveDependency();
            inputJSON = { 'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': [], 'P': [] };
            expectSquenceEntitiesData = [];
            expectParallelEntitiesData = ['A', 'B', 'C', 'D', 'E', 'F', 'P'];
            data = objTest.resolveDependency(inputJSON);
            expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
            expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
            expect(data.parallelEntities.length).toEqual(expectParallelEntitiesData.length);
            expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
            done();
            return [2 /*return*/];
        });
    }); });
    test('Scenario sending valid input object with all dependent entities ====>\n', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var objTest, inputJSON, expectSquenceEntitiesData, expectParallelEntitiesData, data;
        return __generator(this, function (_a) {
            objTest = new app_1.ClsResolveDependency();
            inputJSON = { 'A': ["B"], 'B': ["D", "C", "M", "N"], 'C': ["D"], 'D': ["F"] };
            expectSquenceEntitiesData = ['F', 'D', 'C', 'M', 'N', 'B', 'A'];
            expectParallelEntitiesData = [];
            data = objTest.resolveDependency(inputJSON);
            expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
            expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
            expect(data.parallelEntities.length).toEqual(expectParallelEntitiesData.length);
            expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
            done();
            return [2 /*return*/];
        });
    }); });
    test('Scenario sending Invalid input object ====>\n', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var objTest, inputJSON;
        return __generator(this, function (_a) {
            objTest = new app_1.ClsResolveDependency();
            inputJSON = { 'A': ["B"], 'B': ["D", "C", "M", "N", "A"], 'C': ["D"], 'D': ["F"] };
            try {
                objTest.resolveDependency(inputJSON);
                done();
            }
            catch (error) {
                expect(error).toEqual('Invalid InputJSON');
                done();
            }
            return [2 /*return*/];
        });
    }); });
    // TODO: we can add also add more scenarios... 
});
