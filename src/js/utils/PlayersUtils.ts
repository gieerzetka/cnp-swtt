import {Players} from "../data/Players";
import {IPlayer} from "../interfaces/IPlayer";

export default class PlayersUtils {
	public static generatePlayer(playerName:Players):IPlayer {
		return {
			name: playerName,
			score: 0,
			resource: {
				id: null,
				type: null
			}
		}
	}
}
