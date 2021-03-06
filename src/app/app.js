"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var inputJSON = { 'A': ["B"], 'B': ["D", "C"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [] };
/**
 * Description : use for resolve dependency with inputobject
 */
var ClsResolveDependency = /** @class */ (function () {
    function ClsResolveDependency() {
        this.inputJSON = {};
        this.dependentEntities = new Set();
        this.inputJSON = {};
        this.dependentEntities = new Set();
    }
    /**
     * Sequence starting from the independent table to the most dependent table
     * @param inputJSON
     */
    ClsResolveDependency.prototype.resolveDependency = function (inputJSON) {
        try {
            this.inputJSON = inputJSON;
            //Apply validation
            this.verifyInputJSONValidatin();
            // find sequence entity
            this.findSequenceEnity();
            // find parallel entity
            var parallelResutl = this.findParallelEntity();
            var squenceEntities_1 = [];
            var parallelEntities_1 = [];
            this.dependentEntities.forEach(function (x) { return squenceEntities_1.push(x); });
            parallelResutl.forEach(function (x) { return parallelEntities_1.push(x); });
            // Find difference
            squenceEntities_1 = _.difference(squenceEntities_1, parallelEntities_1);
            return { squenceEntities: squenceEntities_1, parallelEntities: parallelEntities_1 };
        }
        catch (error) {
            console.log('Error : ', JSON.stringify(error));
            throw (error);
        }
    };
    /**
     * A situation in which the imports cannot happen
     */
    ClsResolveDependency.prototype.verifyInputJSONValidatin = function () {
        var _this = this;
        try {
            _.forOwn(this.inputJSON, function (value, key) {
                value = (value.length) ? value : [];
                value.forEach(function (x) {
                    var dependentEntities = _this.inputJSON[x] ? _this.inputJSON[x] : [];
                    if (_.includes(dependentEntities, key))
                        throw ('Invalid InputJSON');
                });
            });
        }
        catch (error) {
            throw (error);
        }
    };
    /**
     *
     * @param x key
     */
    ClsResolveDependency.prototype.arrangeOrder = function (x) {
        var _this = this;
        var values = this.inputJSON[x] ? this.inputJSON[x] : [];
        values.forEach(function (y) { return _this.arrangeOrder(y); });
        this.dependentEntities.add(x);
    };
    /**
     *  Mark all the imports that can happen in parallel
     */
    ClsResolveDependency.prototype.findParallelEntity = function () {
        var _this = this;
        var keys = Object.keys(this.inputJSON);
        var allValues = [].concat.apply([], Object.values(this.inputJSON));
        var unique = _.uniq(allValues);
        var diffEntity = _.difference(keys, unique);
        var parallelEntity = new Set();
        diffEntity.forEach(function (x) {
            var values = _this.inputJSON[x] ? _this.inputJSON[x] : [];
            if (!values.length) {
                parallelEntity.add(x);
            }
        });
        return parallelEntity;
    };
    /**
     * Mark all imports that need to happen in sequence
     */
    ClsResolveDependency.prototype.findSequenceEnity = function () {
        var _this = this;
        var data = new Set();
        _.forOwn(this.inputJSON, function (value, key) {
            if (!value.length)
                _this.dependentEntities.add(key);
            else {
                data.add(key);
                value.forEach(function (x) { return data.add(x); });
            }
        });
        data.forEach(function (x) { return _this.arrangeOrder(x); });
    };
    return ClsResolveDependency;
}());
exports.ClsResolveDependency = ClsResolveDependency;
var objTest = new ClsResolveDependency();
var result = objTest.resolveDependency(inputJSON);
console.log('Results of parallelEntities : ', result.parallelEntities);
console.log('Results of squenceEntities : ', result.squenceEntities);
