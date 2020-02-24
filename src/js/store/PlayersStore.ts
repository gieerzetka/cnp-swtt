import {action, computed, observable} from "mobx";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {IPlayer} from "../interfaces/IPlayer";
import PlayersUtil from "../utils/PlayersUtil";

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

	@action addPoint(name:string) {
		PlayersUtil.getPlayerByName(name).score++;
	}

	@action changeSelectedResource(playerName:Players, resourceId:number, resourceType:ResourceTypes) {
		PlayersUtil.getPlayerByName(playerName).resource = {
			id: resourceId,
			type: resourceType
		};
	}

	@computed get playersCount():number {
		return this.players.length;
	}
}
