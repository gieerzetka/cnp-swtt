import {MainConfig} from "../../src/js/configs/mainConfig";
import {Players} from "../../src/js/data/Players";
import {ResourceTypes} from "../../src/js/data/ResourceTypes";
import {IPlayer} from "../../src/js/interfaces/IPlayer";
import {IResource} from "../../src/js/interfaces/IResource";
import IResourceType from "../../src/js/interfaces/IResourceType";
import AxiosUtils from "../../src/js/utils/AxiosUtils";
import PlayersUtils from "../../src/js/utils/PlayersUtils";
import ResourcesUtils from "../../src/js/utils/ResourcesUtils";
import ResourcesTypesUtils from "../../src/js/utils/ResourceTypesUtils";

const compareResource = (newResource:IResource, resourceType:ResourceTypes, id:number, data:any) => {
	expect(newResource.type).toEqual(resourceType);
	expect(newResource.id).toEqual(id);
	expect(newResource.data).toEqual(data);
};

describe('ResourcesUtilsTests', () => {
	describe('generateNewResource', () => {
		it('should return IResource object', () => {
			const resourceType:ResourceTypes = ResourceTypes.PEOPLE;
			const id:number = 1;
			const data:any = null;
			const newResource:IResource = ResourcesUtils.generateNewResource(resourceType, id, data);
			compareResource(newResource, resourceType, id, data);
		});
	});

	describe('handleFetchingNewResource', () => {
		describe('should check for cached resource', () => {
			it('and return IResource when one is found', async () => {
				let checkForCachedResource = false;
				const id:number = 1;
				const data:any = null;

				const player:IPlayer = PlayersUtils.generatePlayer(Players.PLAYER_1);
				const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
				const checkForExistingResourceCallback = ():IResource => {
					checkForCachedResource = true;
					return ResourcesUtils.generateNewResource(resourceType.name, id, data);
				};
				const successCallback = () => {};
				const errorCallback = () => {};
				const cachedResource:IResource = await ResourcesUtils.handleFetchingNewResource(player, resourceType, checkForExistingResourceCallback, successCallback, errorCallback);

				expect(checkForCachedResource).toBeTruthy();
				compareResource(cachedResource, resourceType.name, id, data);
			});

			it('and return undefined when no cached resource has been found', async () => {
				let checkForCachedResource = false;

				const player:IPlayer = PlayersUtils.generatePlayer(Players.PLAYER_1);
				const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
				const checkForExistingResourceCallback = ():IResource => {
					checkForCachedResource = true;
					return null;
				};
				const successCallback = () => {};
				const errorCallback = () => {};
				spyOn(AxiosUtils, "get").and.resolveTo('');
				const cachedResource:IResource = await ResourcesUtils.handleFetchingNewResource(player, resourceType, checkForExistingResourceCallback, successCallback, errorCallback);
				expect(checkForCachedResource).toBeTruthy();
				expect(cachedResource).toBeUndefined();
			});
		});

		it('when there is no cached resource and after success should call successCallback', async () => {
			let successCallbackCalled = false;
			const player:IPlayer = PlayersUtils.generatePlayer(Players.PLAYER_1);
			const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
			const checkForExistingResourceCallback = ():IResource => null;
			const successCallback = () => {successCallbackCalled = true;};
			const errorCallback = () => {};
			spyOn(AxiosUtils, "get").and.resolveTo('');
			await ResourcesUtils.handleFetchingNewResource(player, resourceType, checkForExistingResourceCallback, successCallback, errorCallback);
			expect(successCallbackCalled).toBeTruthy();
		});

		it('after to many download attempts should call errorCallback', async () => {
			let errorCallbackCalled = false;
			const player:IPlayer = PlayersUtils.generatePlayer(Players.PLAYER_1);
			const resourceType:IResourceType = ResourcesTypesUtils.getResourceTypesData(ResourceTypes.PEOPLE);
			const checkForExistingResourceCallback = ():IResource => null;
			const successCallback = () => {};
			const errorCallback = () => {errorCallbackCalled = true};
			const attempts = MainConfig.APIAttemptsBeforeGiveUp + 1;
			await ResourcesUtils.handleFetchingNewResource(player, resourceType, checkForExistingResourceCallback, successCallback, errorCallback, attempts);
			expect(errorCallbackCalled).toBeTruthy();
		});
	});
});
