
/**
 * Imort lib and classes
 */
import { ClsResolveDependency, IResult } from "../../app/app";

describe('Test for ClsResolveDependency', () => {

    beforeAll(async (done) => {

        // TODO: some operation before test started
        done();
    });

    test('Scenario sending valid input object all exist table ====>\n', async (done) => {

        const objTest: ClsResolveDependency = new ClsResolveDependency();
        let inputJSON: any = { 'A': ["B"], 'B': ["D", "C"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [] };
        const expectSquenceEntitiesData: Array<string> = ['F', 'D', 'C', 'B', 'A'];
        const expectParallelEntitiesData: Array<string> = ['E'];
        const data:IResult = objTest.resolveDependency(inputJSON);
        expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
        expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
        expect(data.parallelEntities .length).toEqual(expectParallelEntitiesData.length);
        expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
        done();
    });

    test('Scenario sending valid input object other non exits table like M,N and added P independen entity ====>\n', async (done) => {
        const objTest: ClsResolveDependency = new ClsResolveDependency();
        let inputJSON: any = { 'A': ["B"], 'B': ["D", "C", "M", "N"], 'C': ["D"], 'D': ["F"], 'E': [], 'F': [],'P':[] };
        const expectSquenceEntitiesData: Array<string> = ['F', 'D', 'C', 'M', 'N', 'B', 'A'];
        const expectParallelEntitiesData: Array<string> = ['E', 'P'];
        const data:IResult = objTest.resolveDependency(inputJSON);
        expect(data.squenceEntities.length).toEqual(expectSquenceEntitiesData.length);
        expect(data.squenceEntities).toEqual(expectSquenceEntitiesData);
        expect(data.parallelEntities .length).toEqual(expectParallelEntitiesData.length);
        expect(data.parallelEntities).toEqual(expectParallelEntitiesData);
        done();
    });
    // TODO: We call add various scenarios 
});


