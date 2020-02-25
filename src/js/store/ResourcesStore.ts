import {action, observable} from "mobx";
import {ResourceTypes} from "../data/ResourceTypes";
import {IResource} from "../interfaces/IResource";
import ResourcesUtils from "../utils/ResourcesUtils";

export default class ResourcesStore {
	@observable resources:IResource[] = [];

	@action addNewResource(resourceId:number, fetchedResourceData:any, type:ResourceTypes) {
		this.resources.push(ResourcesUtils.generateNewResource(type, resourceId, fetchedResourceData))
	}

	public getResourceByIdAndType(resourceId:number, resourceType:ResourceTypes):IResource {
		return this.resources.find(resource => resource.id === resourceId && resource.type === resourceType);
	}

	public getStatPower(resourceId:number, resourceType:ResourceTypes, statName:string):number {
		const resource:IResource = this.getResourceByIdAndType(resourceId, resourceType);
		let statPower:number = parseInt(resource.data[statName]);
		return isNaN(statPower) ? 0 : statPower;
	}
}
