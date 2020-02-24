import {action, observable} from "mobx";
import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../index";

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
}
