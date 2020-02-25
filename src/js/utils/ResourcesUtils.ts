import {AxiosResponse} from "axios";
import {MainConfig} from "../configs/mainConfig";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {IPlayer} from "../interfaces/IPlayer";
import {IResource} from "../interfaces/IResource";
import IResourceType from "../interfaces/IResourceType";
import {swttStore} from "../store/RootStore";
import AxiosUtils from "./AxiosUtils";
import CommonUtils from "./CommonUtils";

export default class ResourcesUtils {
	public static generateNewResource(type:ResourceTypes, id:number, data:any):IResource {
		return {
			type,
			id,
			data
		}
	}

	public static async handleFetchingNewResource(
		player:IPlayer,
		selectedResourceType:IResourceType,
		checkForExistingResourceCallback:(newResourceId:number, selectedResourceTypeName:ResourceTypes) => IResource,
		successCallback:(newResourceId:number, responseData:any, selectedResourceTypeName:ResourceTypes, playerName:Players) => void,
		errorCallback:() => void,
		attempts = 0
	) {
		if (attempts >= MainConfig.APIAttemptsBeforeGiveUp) {
			errorCallback();
			return;
		}

		const newResourceId = CommonUtils.random(1, selectedResourceType.entriesCount);
		const existingResource:IResource = checkForExistingResourceCallback(newResourceId, selectedResourceType.name);
		if (existingResource) {
			swttStore.fight.finishDownloadingFightData();
			return existingResource;
		}

		await AxiosUtils.get(`${selectedResourceType.apiEndpoint}${newResourceId}`)
			.then((response:AxiosResponse) => {
				successCallback(newResourceId, response.data, selectedResourceType.name, player.name);
			})
			.catch(() => {
				ResourcesUtils.handleFetchingNewResource(player, selectedResourceType, checkForExistingResourceCallback, successCallback, errorCallback, attempts + 1);
			})
	}

}
