import {swttStore} from "../index";
import ResourceTypesUtil from "./ResourceTypesUtils";

export default class GameUtils {
	public static async loadGame() {
		swttStore.game.startLoadingGame();
		const resourceTypes = swttStore.resourceTypes.resourceTypes;
		for (let i = 0; i < resourceTypes.length; i++) {
			await ResourceTypesUtil.handleFetchingResourceTypeData(resourceTypes[i]);
		}
	}
}
