import {ResourceTypes} from "../data/ResourceTypes";
import IResourceWinningStat from "./IResourceWinningStat";

export default interface IResourceType {
	name:ResourceTypes;
	apiEndpoint:string;
	entriesCount:number;
	winningStat:IResourceWinningStat;
}
