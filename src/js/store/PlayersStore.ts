import {action, computed, observable} from "mobx";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {IPlayer} from "../interfaces/IPlayer";
import PlayersUtils from "../utils/PlayersUtils";

export default class PlayersStore {
	constructor() {
		Object.values(Players).forEach(playerName => {
			this.players.push({
				name: playerName,
				score: 0,
				resource: {
					id: null,
					type: null
				}
			});
		});
	}

	@observable players:IPlayer[] = [];

	@computed get playersCount():number {
		return this.players.length;
	}

	@computed get highestScore():number {

		let higestScore:number = 0;

		this.players.forEach(player => {
			const score = PlayersUtils.getPlayerScore(player);
			if (score > higestScore)
				higestScore = score;
		});

		return higestScore;
	}

	@action addPoint(playerName:string) {
		PlayersUtils.getPlayerByName(playerName).score++;
	}

	@action changePlayerResource(playerName:Players, resourceId:number, resourceType:ResourceTypes) {
		PlayersUtils.getPlayerByName(playerName).resource = {
			id: resourceId,
			type: resourceType
		};
	}
}
