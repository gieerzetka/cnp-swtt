import {AxiosError, AxiosResponse} from "axios";
import {MainConfig} from "../configs/mainConfig";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import {IPlayer} from "../interfaces/IPlayer";
import {IResource} from "../interfaces/IResource";
import IResourceType from "../interfaces/IResourceType";
import AxiosUtils from "./AxiosUtils";
import CommonUtils from "./CommonUtils";
import ResourceTypesUtil from "./ResourceTypesUtils";

export default class ResourcesUtils {
	public static getResourceByIdAndType(resourceId:number, resourceType:ResourceTypes):IResource {
		return swttStore.resources.resources.find(resource => resource.id === resourceId && resource.type === resourceType);
	}

	public static async handleFetchingNewResource(player:IPlayer, attempts = 0) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			swttStore.fight.markLoadingFightAsError();
			return;
		}

		const selectedResourceType:IResourceType = ResourceTypesUtil.getResourceType(swttStore.resourceTypes.selectedResourceType);
		const newResourceId = CommonUtils.random(1, selectedResourceType.entriesCount);

		const existingResource:IResource = ResourcesUtils.getResourceByIdAndType(newResourceId, selectedResourceType.name);
		if (existingResource) {
			swttStore.fight.finishDownloadingFightData();
			return existingResource;
		}

		await AxiosUtils.get(`${selectedResourceType.apiEndpoint}${newResourceId}`)
			.then((response:AxiosResponse) => {
				swttStore.resources.addNewResource(newResourceId, response.data, selectedResourceType.name);
				swttStore.players.changePlayerResource(player.name, newResourceId, selectedResourceType.name);
				swttStore.fight.finishDownloadingFightData();
			})
			.catch((error:AxiosError) => {
				ResourcesUtils.handleFetchingNewResource(player, attempts + 1);
			})
	}

	public static getStatPower(resourceId:number, resourceType:ResourceTypes, statName:string):number {
		const resource:IResource = ResourcesUtils.getResourceByIdAndType(resourceId, resourceType);
		let statPower:number = parseInt(resource.data[statName]);
		return isNaN(statPower) ? 0 : statPower;
	}

}
