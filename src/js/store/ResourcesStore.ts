import {AxiosError, AxiosResponse} from "axios";
import {action, computed, observable} from "mobx";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import {IResource} from "../interfaces/IResource";
import IResourceType from "../interfaces/IResourceType";
import AxiosUtil from "../utils/AxiosUtil";
import CommonUtil from "../utils/CommonUtil";
import ResourcesUtil from "../utils/ResourcesUtil";

export default class ResourcesStore {
	constructor() {
		Object.values(ResourceTypes).forEach(resourceTypeName => {
			this.resourceTypes.push(ResourcesUtil.generateResourceType(resourceTypeName));
		});
	}

	resourceTypes:IResourceType[] = [];
	@observable selectedResourceType:ResourceTypes = ResourceTypes.PEOPLE;
	@observable resources:IResource[] = [];

	@computed get resourceTypesCount():number {
		return this.resourceTypes.length;
	}

	@action changeSelectedResourceType(newResourceType:ResourceTypes) {
		if (newResourceType)
			this.selectedResourceType = newResourceType;
	}

	@action fetchResourceTypeData(resourceType:IResourceType):any {
		return AxiosUtil.get(resourceType.apiEndpoint)
			.then(
				action('getResourceTypeDataSuccess', (response:AxiosResponse) => {
					this.updateResourceTypeEntriesCount(response.data, resourceType.name);
					swttStore.game.finishDownloadingResourceTypesData();
					return response;
				}),
				action('getResourceTypeDataFailure', (error:AxiosError) => {
					throw new Error(error.code);
				})
			)
	}

	@action updateResourceTypeEntriesCount(fetchedResourceTypeData:any, resourceTypeName:ResourceTypes) {
		ResourcesUtil.getResourceType(resourceTypeName).entriesCount = fetchedResourceTypeData.count;
	}

	@action fetchNewResource():any {
		const selectedResourceType:IResourceType = ResourcesUtil.getResourceType(swttStore.resources.selectedResourceType);
		const newResourceId = CommonUtil.random(1, selectedResourceType.entriesCount);

		const existingResource:IResource = ResourcesUtil.getResourceByIdAndType(newResourceId, selectedResourceType.name);
		if (existingResource) {
			swttStore.game.finishDownloadingFightData();
			return existingResource;
		}

		return AxiosUtil.get(`${selectedResourceType.apiEndpoint}${newResourceId}`)
			.then(
				action('getNewResourceSuccess', (response:AxiosResponse) => {
					swttStore.resources.addNewResource(response.data, selectedResourceType.name);
					swttStore.game.finishDownloadingFightData();
					return response;
				}),
				action('getNewResourceFailure', (error:AxiosError) => {
					throw new Error(error.code);
				})
			)
	}

	@action addNewResource(fetchedResourceData:any, type:ResourceTypes) {
		this.resources.push({
			type: type,
			id: fetchedResourceData.id,
			data: fetchedResourceData
		})
	}
}
