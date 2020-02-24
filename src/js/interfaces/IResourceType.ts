import {ResourceTypes} from "../data/ResourceTypes";

export default interface IResourceType {
	name:ResourceTypes;
	apiEndpoint:string;
	entriesCount:number;
}
