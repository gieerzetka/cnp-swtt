import {swttStore} from "../index";

export default class PlayersUtil {
	public static getPlayerByName(name:string) {
		return swttStore.players.players.find(player => player.name === name);
	}
}
