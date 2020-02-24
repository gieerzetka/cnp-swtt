import {action, observable} from "mobx";
import {FetchStatuses} from "../data/FetchStatuses";
import {Players} from "../data/Players";
import {swttStore} from "../index";

export default class FightStore {
	@observable fightStatus:FetchStatuses = FetchStatuses.PRISTINE;
	@observable fightWinners:Players[] = [];
	downloadedFightData:number = 0;

	@action startFighting() {
		this.fightStatus = FetchStatuses.PENDING;
		this.fightWinners = [];
		this.downloadedFightData = 0;
	}

	@action markLoadingFightAsError() {
		this.fightStatus = FetchStatuses.ERROR;
	}

	@action finishDownloadingFightData() {
		this.downloadedFightData++;
		if (this.downloadedFightData === swttStore.players.playersCount)
			this.fightStatus = FetchStatuses.SUCCESS;
	}

	@action addWinner(playerName:Players) {
		this.fightWinners.push(playerName);
	}
}
