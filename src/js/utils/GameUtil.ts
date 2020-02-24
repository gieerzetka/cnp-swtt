import {swttStore} from "../index";
import ResourcesUtil from "./ResourcesUtil";

export default class GameUtil {
	public static loadGame() {
		swttStore.game.startLoadingGame();
		const resourceTypes = swttStore.resources.resourceTypes;
		for (let i = 0; i < resourceTypes.length; i++) {
			ResourcesUtil.handleFetchingResourceTypeData(resourceTypes[i]);
		}
	}

	public static startFight() {
		swttStore.game.startFighting();
		const players = swttStore.players.players;
		for (let i = 0; i < players.length; i++) {
			ResourcesUtil.handleFetchingNewResource(players[i]);
		}
	}
}
