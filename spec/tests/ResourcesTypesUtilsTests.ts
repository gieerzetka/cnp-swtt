import {MainConfig} from "../../src/js/configs/mainConfig";
import {ResourceTypes} from "../../src/js/data/ResourceTypes";
import IResourceType from "../../src/js/interfaces/IResourceType";
import AxiosUtils from "../../src/js/utils/AxiosUtils";
import ResourcesTypesUtils from "../../src/js/utils/ResourceTypesUtils";

describe('ResourcesTypesUtilsTests', () => {
	describe('getResourceTypesData', () => {
		it('Should return appropriate resourceTypesData', () => {
			const resourceTypeData:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
			expect(resourceTypeData.name).toEqual(ResourceTypes.PEOPLE);
		});
	});

	describe('handleFetchingResourceTypeData', () => {
		it('after success should call successCallback', async () => {
			let successCallbackCalled = false;
			const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
			const successCallback = () => {successCallbackCalled = true;};
			const errorCallback = () => {};
			spyOn(AxiosUtils, "get").and.resolveTo('');
			await ResourcesTypesUtils.handleFetchingResourceTypeData(resourceType, successCallback, errorCallback);
			expect(successCallbackCalled).toBeTruthy();
		});

		it('after to many download attempts should call errorCallback', async () => {
			let errorCallbackCalled = false;
			const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
			const successCallback = () => {};
			const errorCallback = () => {errorCallbackCalled = true;};
			const attempts = MainConfig.APIAttemptsBeforeGiveUp +1;
			await ResourcesTypesUtils.handleFetchingResourceTypeData(resourceType, successCallback, errorCallback, attempts);
			expect(errorCallbackCalled).toBeTruthy();
		});
	});
});
