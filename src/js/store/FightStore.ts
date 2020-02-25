import {action, observable} from "mobx";
import {FetchStatuses} from "../data/FetchStatuses";
import {FightStatuses} from "../data/FightStatuses";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {IPlayer} from "../interfaces/IPlayer";
import ResourcesUtils from "../utils/ResourcesUtils";
import {swttStore} from "./RootStore";

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
			this.settleFight();
			swttStore.fight.markLoadingFightAsSuccess();
		}
	}

	@action addWinner(playerName:Players) {
		this.fightWinners.push(playerName);
	}

	public startFight() {
		this.startFighting();
		const players = swttStore.players.players;
		const checkForExistingResourceCallback = (newResourceId:number, selectedResourceTypeName:ResourceTypes) => swttStore.resources.getResourceByIdAndType(newResourceId, selectedResourceTypeName);
		const successCallback = (newResourceId:number, responseData:any, selectedResourceTypeName:ResourceTypes, playerName:Players) => {
			swttStore.resources.addNewResource(newResourceId, responseData, selectedResourceTypeName);
			swttStore.players.changePlayerResource(playerName, newResourceId, selectedResourceTypeName);
			this.finishDownloadingFightData();
		};
		const errorCallback = () => {this.markLoadingFightAsError()};
		for (let i = 0; i < players.length; i++) {
			ResourcesUtils.handleFetchingNewResource(
				players[i],
				swttStore.resourceTypes.getResourceType(swttStore.resourceTypes.selectedResourceType),
				checkForExistingResourceCallback,
				successCallback,
				errorCallback
			);
		}
	}

	public settleFight() {
		const highestScore:number = swttStore.players.highestScore;
		let winners:IPlayer[] = [];

		swttStore.players.players.forEach(player => {
			const playerScore = swttStore.players.getPlayerScore(player);
			if (playerScore === highestScore) {
				this.addWinner(player.name);
				winners.push(player);
			}
		});

		winners.forEach(winner => {
			const status:FightStatuses = swttStore.players.getPlayerFightStatus(winner);

			if (status === FightStatuses.WINNER)
				swttStore.players.addPoint(winner.name);
		})
	}
}
