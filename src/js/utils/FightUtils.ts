import {FightStatuses} from "../data/FightStatuses";
import {swttStore} from "../index";
import {IPlayer} from "../interfaces/IPlayer";
import PlayersUtils from "./PlayersUtils";
import ResourcesUtils from "./ResourcesUtils";

export default class FightUtils {
	public static async startFight() {
		swttStore.fight.startFighting();
		const players = swttStore.players.players;
		for (let i = 0; i < players.length; i++) {
			await ResourcesUtils.handleFetchingNewResource(players[i]);
		}
	}

	public static settleFight() {
		const highestScore:number = swttStore.players.highestScore;
		let winners:IPlayer[] = [];

		swttStore.players.players.forEach(player => {
			const playerScore = PlayersUtils.getPlayerScore(player);
			if (playerScore === highestScore) {
				swttStore.fight.addWinner(player.name);
				winners.push(player);
			}
		});

		winners.forEach(winner => {
			const status:FightStatuses = PlayersUtils.getPlayerFightStatus(winner);

			if (status === FightStatuses.WINNER)
				swttStore.players.addPoint(winner.name);
		})
	}
}
