import {action, observable} from "mobx";
import {ResourceTypes} from "../data/ResourceTypes";
import {IResource} from "../interfaces/IResource";

export default class ResourcesStore {
	@observable resources:IResource[] = [];

	@action addNewResource(resourceId:number, fetchedResourceData:any, type:ResourceTypes) {
		this.resources.push({
			type: type,
			id: resourceId,
			data: fetchedResourceData
		})
	}
}
