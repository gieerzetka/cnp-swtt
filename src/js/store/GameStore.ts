import {action, observable} from "mobx";
import {GameStatuses} from "../data/GameStatuses";
import {swttStore} from "../index";

export default class GameStore {
	@observable loadingGame:GameStatuses = GameStatuses.PRISTINE;
	downloadedResourceTypesData:number = 0;
	@observable fightStatus:GameStatuses = GameStatuses.PRISTINE;
	downloadedFightData:number = 0;

	@action startLoadingGame() {
		this.loadingGame = GameStatuses.PENDING;
	}

	@action markLoadingGameAsError() {
		this.loadingGame = GameStatuses.ERROR;
	}

	@action finishDownloadingResourceTypesData() {
		this.downloadedResourceTypesData++;
		if (this.downloadedResourceTypesData === swttStore.resources.resourceTypesCount)
			this.loadingGame = GameStatuses.SUCCESS;
	}

	@action startFighting() {
		this.fightStatus = GameStatuses.PENDING;
		this.downloadedFightData = 0;
	}

	@action markLoadingFightAsError() {
		this.fightStatus = GameStatuses.ERROR;
	}

	@action finishDownloadingFightData() {
		this.downloadedFightData++;
		if (this.downloadedFightData === swttStore.players.playersCount)
			this.fightStatus = GameStatuses.SUCCESS;
	}
}
