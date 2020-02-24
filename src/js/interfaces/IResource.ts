import {ResourceTypes} from "../data/ResourceTypes";

export interface IResource {
	type:ResourceTypes;
	id:number;
	data:{};
}
