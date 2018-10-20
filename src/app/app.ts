

let _ = require('lodash');

const inputJSON: any = { 'A': ["B"], 'B': ["D", "C"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [] };

export interface IResult {
    squenceEntities: Array<string>;
    parallelEntities: Array<string>;
}
/**
 * Description : use for resolve dependency with inputobject
 */
export class ClsResolveDependency {

    inputJSON: any = {};
    depndentTable = new Set();

    constructor() {
        this.inputJSON = {};
        this.depndentTable = new Set();
    }
    /**
     * Sequence starting from the independent table to the most dependent table
     * @param inputJSON 
     */
    public resolveDependency(inputJSON: any): IResult {

        try {
            //TODO: Apply validation for invalid json object

            this.inputJSON = inputJSON;
            this.findSequenceEnity();
            const parallelResutl = this.findParallelEntity();
            let squenceEntities = []; let parallelEntities = [];
            this.depndentTable.forEach((x) => squenceEntities.push(x));
            parallelResutl.forEach((x) => parallelEntities.push(x));
            // Find difference
            squenceEntities = _.difference(squenceEntities, parallelEntities);
            return { squenceEntities, parallelEntities };
        } catch (error) {
            console.log('Error : ', JSON.stringify(error));
            throw (error);
        }
    }
    /**
     * 
     * @param x key
     */
    private arrangeOrder(x: string) {

        let values = this.inputJSON[x] ? this.inputJSON[x] : [];
        values.forEach((y:string) => this.arrangeOrder(y))
        this.depndentTable.add(x);
    }

    /**
     *  Mark all the imports that can happen in parallel 
     */
    private findParallelEntity(): Set<string> {

        let keys = Object.keys(this.inputJSON);
        let allValues = [].concat.apply([], Object.values(this.inputJSON));
        let unique = _.uniq(allValues);
        let diffEntity = _.difference(keys, unique);
        let parallelEntity = new Set();
        diffEntity.forEach((x:string) => {
            const values = this.inputJSON[x] ? this.inputJSON[x] : [];
            if (!values.length) {
                parallelEntity.add(x);
            }
        });
        return parallelEntity;
    }
    /**
     * Mark all imports that need to happen in sequence 
     */
    private findSequenceEnity() {

        let data = new Set();
        _.forOwn(this.inputJSON, (value:any, key:string) => {
            if (!value.length)
                this.depndentTable.add(key);
            else {
                data.add(key)
                value.forEach((x) => data.add(x))
            }
        });
        data.forEach((x) => this.arrangeOrder(x))

    }
}

const objTest: ClsResolveDependency = new ClsResolveDependency();
let result: IResult = objTest.resolveDependency(inputJSON)
console.log('Results of parallelEntities : ', result.parallelEntities);
console.log('Results of squenceEntities : ', result.squenceEntities);

