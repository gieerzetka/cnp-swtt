import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../index";
import PlayersUtils from "./PlayersUtils";
import ResourcesUtils from "./ResourcesUtils";

export default class FightUtils {
	public static async startFight() {
		swttStore.fight.startFighting();
		const players = swttStore.players.players;
		for (let i = 0; i < players.length; i++) {
			await ResourcesUtils.handleFetchingNewResource(players[i]);
		}

		if (swttStore.fight.fightStatus === FetchStatuses.SUCCESS)
			FightUtils.settleFight();
	}

	public static settleFight() {
		const higestScore:number = swttStore.players.highestScore;

		swttStore.players.players.forEach(player => {
			const playerScore = PlayersUtils.getPlayerScore(player);
			if (playerScore === higestScore)
				swttStore.fight.addWinner(player.name);
		});
	}
}
