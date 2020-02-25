import {action, computed, observable} from "mobx";
import {FightStatuses} from "../data/FightStatuses";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {IPlayer} from "../interfaces/IPlayer";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import PlayersUtils from "../utils/PlayersUtils";
import {swttStore} from "./RootStore";

export default class PlayersStore {
	constructor() {
		Object.values(Players).forEach(playerName => {
			this.players.push(PlayersUtils.generatePlayer(playerName));
		});
	}

	@observable players:IPlayer[] = [];

	@computed get playersCount():number {
		return this.players.length;
	}

	@computed get highestScore():number {

		let higestScore:number = 0;

		this.players.forEach(player => {
			const score = this.getPlayerScore(player);
			if (score > higestScore)
				higestScore = score;
		});

		return higestScore;
	}

	@action addPoint(playerName:string) {
		this.getPlayerByName(playerName).score++;
	}

	@action changePlayerResource(playerName:Players, resourceId:number, resourceType:ResourceTypes) {
		this.getPlayerByName(playerName).resource = {
			id: resourceId,
			type: resourceType
		};
	}

	public getPlayerByName(name:string):IPlayer {
		return this.players.find(player => player.name === name);
	}

	public getPlayerScore(player:IPlayer):number {
		const resourceType:ResourceTypes = swttStore.resourceTypes.selectedResourceType;
		const resourceWinningStat:IResourceWinningStat = swttStore.resourceTypes.getResourceTypeWinningStat(resourceType);
		return swttStore.resources.getStatPower(player.resource.id, resourceType, resourceWinningStat.name);
	}

	public getPlayerFightStatus(player:IPlayer):FightStatuses {
		const fightWinners:Players[] = swttStore.fight.fightWinners;
		const winnersCount:number = fightWinners.length;

		if (winnersCount == 0)
			return FightStatuses.TIE;

		const playersCount:number = this.playersCount;
		const isWinner:boolean = fightWinners.includes(player.name);

		if (winnersCount < playersCount && isWinner)
			return FightStatuses.WINNER;
		else if (winnersCount === playersCount && isWinner)
			return FightStatuses.TIE;
		else
			return FightStatuses.LOOSER;

	}
}
