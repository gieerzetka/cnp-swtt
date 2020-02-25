import {action, observable} from "mobx";
import {FetchStatuses} from "../data/FetchStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import ResourceTypesUtil from "../utils/ResourceTypesUtils";
import {swttStore} from "./RootStore";

export default class GameStore {
	@observable loadingGame:FetchStatuses = FetchStatuses.PRISTINE;
	downloadedResourceTypesData:number = 0;

	@action startLoadingGame() {
		this.loadingGame = FetchStatuses.PENDING;
	}

	@action markLoadingGameAsError() {
		this.loadingGame = FetchStatuses.ERROR;
	}

	@action finishDownloadingResourceTypesData() {
		this.downloadedResourceTypesData++;
		if (this.downloadedResourceTypesData === swttStore.resourceTypes.resourceTypesCount)
			this.loadingGame = FetchStatuses.SUCCESS;
	}

	public loadGame() {
		swttStore.game.startLoadingGame();
		const resourceTypes = swttStore.resourceTypes.resourceTypes;
		for (let i = 0; i < resourceTypes.length; i++) {
			ResourceTypesUtil.handleFetchingResourceTypeData(resourceTypes[i], this.finishLoadGame, this.markLoadingGameAsError);
		}
	}

	private finishLoadGame(responseData:any, resourceTypeName:ResourceTypes) {
		swttStore.resourceTypes.updateResourceTypeEntriesCount(responseData, resourceTypeName);
		swttStore.game.finishDownloadingResourceTypesData();
	}
}
