import {AxiosResponse} from "axios";
import {MainConfig} from "../configs/mainConfig";
import {ResourceTypes, ResourceTypesData} from "../data/ResourceTypes";
import IResourceType from "../interfaces/IResourceType";
import AxiosUtils from "./AxiosUtils";

export default class ResourcesTypesUtils {
	public static getResourceTypesData(type:ResourceTypes):IResourceType {
		return ResourceTypesData.find(resource => resource.name === type);
	}

	public static async handleFetchingResourceTypeData(
		resourceType:IResourceType,
		successCallback:(responseData:any, resourceTypeName:ResourceTypes) => void,
		errorCallback:() => void,
		attempts = 0
	) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			errorCallback();
			return;
		}

		await AxiosUtils.get(resourceType.apiEndpoint)
			.then((response:AxiosResponse) => {
				successCallback(response.data, resourceType.name);
					return response;
				})
			.catch(async () => {
				console.log('aaaaaaaaaaaaaaaaaa');
				await ResourcesTypesUtils.handleFetchingResourceTypeData(resourceType, successCallback, errorCallback, attempts + 1);
				}
			);
	}
}
