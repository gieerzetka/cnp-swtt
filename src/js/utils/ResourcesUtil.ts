import {AxiosError, AxiosResponse} from "axios";
import {MainConfig} from "../configs/mainConfig";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import {IPlayer} from "../interfaces/IPlayer";
import {IResource} from "../interfaces/IResource";
import IResourceType from "../interfaces/IResourceType";

export default class ResourcesUtil {
	public static generateResourceType(type:ResourceTypes):IResourceType {
		switch (type) {
			case ResourceTypes.PEOPLE:
				return {
					name: ResourceTypes.PEOPLE,
					apiEndpoint: 'people/',
					entriesCount: 0
				};
			case ResourceTypes.STARSHIPS:
				return {
					name: ResourceTypes.STARSHIPS,
					apiEndpoint: 'starships/',
					entriesCount: 0
				};
		}
	}

	public static getResourceType(searchedResourceType:ResourceTypes):IResourceType {
		return swttStore.resources.resourceTypes.find(resourceType => resourceType.name === searchedResourceType);
	}

	public static getResourceByIdAndType(resourceId:number, resourceType:ResourceTypes):IResource {
		return swttStore.resources.resources.find(resource => resource.id === resourceId && resource.type === resourceType);
	}

	public static handleFetchingResourceTypeData(resourceType:IResourceType, attempts = 0) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			swttStore.game.markLoadingGameAsError();
			return;
		}

		swttStore.resources.fetchResourceTypeData(resourceType)
			.then((response:AxiosResponse) => {
					return;
				},
				(error:AxiosError) => {
					ResourcesUtil.handleFetchingResourceTypeData(resourceType, attempts + 1);
				});
	}

	public static handleFetchingNewResource(player:IPlayer, attempts = 0) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			swttStore.game.markLoadingFightAsError();
			return;
		}

		swttStore.resources.fetchNewResource()
			.then((response:AxiosResponse) => {
					swttStore.players.changeSelectedResource(player.name, response.data.id, response.data.type);
				},
				(error:AxiosError) => {
					ResourcesUtil.handleFetchingNewResource(player, attempts + 1);
				});
	}

}
