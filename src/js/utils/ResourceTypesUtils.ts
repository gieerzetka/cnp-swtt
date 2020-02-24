import {AxiosError, AxiosResponse} from "axios";
import {MainConfig} from "../configs/mainConfig";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import IResourceType from "../interfaces/IResourceType";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import AxiosUtils from "./AxiosUtils";

export default class ResourcesTypesUtil {
	public static generateResourceType(type:ResourceTypes):IResourceType {
		switch (type) {
			case ResourceTypes.PEOPLE:
				return {
					name: ResourceTypes.PEOPLE,
					apiEndpoint: 'people/',
					entriesCount: 0,
					winningStat: {
						name: "mass",
						displayName: "Mass"
					}
				};
			case ResourceTypes.STARSHIPS:
				return {
					name: ResourceTypes.STARSHIPS,
					apiEndpoint: 'starships/',
					entriesCount: 0,
					winningStat: {
						name: "crew",
						displayName: "Crew"
					}
				};
		}
	}

	public static getResourceType(searchedResourceType:ResourceTypes):IResourceType {
		return swttStore.resourceTypes.resourceTypes.find(resourceType => resourceType.name === searchedResourceType);
	}

	public static async handleFetchingResourceTypeData(resourceType:IResourceType, attempts = 0) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			swttStore.game.markLoadingGameAsError();
			return;
		}

		await AxiosUtils.get(resourceType.apiEndpoint)
			.then((response:AxiosResponse) => {
					swttStore.resourceTypes.updateResourceTypeEntriesCount(response.data, resourceType.name);
					swttStore.game.finishDownloadingResourceTypesData();
					return response;
				})
			.catch((error:AxiosError) => {
					ResourcesTypesUtil.handleFetchingResourceTypeData(resourceType, attempts + 1);
				}
			);
	}

	public static getResourceTypeWinningStat(resourceType:ResourceTypes):IResourceWinningStat {
		return ResourcesTypesUtil.getResourceType(resourceType).winningStat;
	}
}
