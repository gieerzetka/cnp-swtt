import CommonUtils from "../../src/js/utils/CommonUtils";

const runRandomTests = (min?:number, max?:number) => {
	for (let i = 0; i < 10; i++) {
		const randomNumber:number = CommonUtils.random(min, max);
		min = !!min ? min : 0;
		max = !!max ? max : 100;
		expect(randomNumber >= min && randomNumber <= max).toBeTruthy();
	}
};

describe('CommonUtilsTests', () => {
	describe('random', () => {
		it('without any params shpuld return number between 0 and 100', () => {
			runRandomTests();
		});

		it('with params should return number between given min and max', () => {
			runRandomTests(1, 10);
		});

		it('should handle properly negative numbers', () => {
			runRandomTests(-10, 1);
		});

		it('should handle properly min === max', () => {
			runRandomTests(1, 1);
		});
	})
});
