import {action, observable} from "mobx";
import {FetchStatuses} from "../data/FetchStatuses";
import {Players} from "../data/Players";
import {swttStore} from "../index";
import FightUtils from "../utils/FightUtils";

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

	@action markLoadingFightAsSuccess() {
		this.fightStatus = FetchStatuses.SUCCESS;
	}

	@action finishDownloadingFightData() {
		this.downloadedFightData++;

		if (swttStore.fight.downloadedFightData === swttStore.players.playersCount) {
			FightUtils.settleFight();
			swttStore.fight.markLoadingFightAsSuccess();
		}
	}

	@action addWinner(playerName:Players) {
		this.fightWinners.push(playerName);
	}
}
