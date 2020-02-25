import {action, computed, observable} from "mobx";
import {ResourceTypes} from "../data/ResourceTypes";
import IResourceType from "../interfaces/IResourceType";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import ResourceTypesUtil from "../utils/ResourceTypesUtils";

export default class ResourceTypesStore {
	constructor() {
		Object.values(ResourceTypes).forEach(resourceTypeName => {
			this.resourceTypes.push(ResourceTypesUtil.getResourceTypesData(resourceTypeName));
		});
	}

	resourceTypes:IResourceType[] = [];
	@observable selectedResourceType:ResourceTypes = ResourceTypes.PEOPLE;

	@computed get resourceTypesCount():number {
		return this.resourceTypes.length;
	}

	@action changeSelectedResourceType(newResourceType:ResourceTypes) {
		if (newResourceType)
			this.selectedResourceType = newResourceType;
	}

	@action updateResourceTypeEntriesCount(fetchedResourceTypeData:any, resourceTypeName:ResourceTypes) {
		this.getResourceType(resourceTypeName).entriesCount = fetchedResourceTypeData.count;
	}

	public getResourceType(searchedResourceType:ResourceTypes):IResourceType {
		return this.resourceTypes.find(resourceType => resourceType.name === searchedResourceType);
	}

	public getResourceTypeWinningStat(resourceType:ResourceTypes):IResourceWinningStat {
		return this.getResourceType(resourceType).winningStat;
	}
}
