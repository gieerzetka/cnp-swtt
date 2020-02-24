import {FightStatuses} from "../data/FightStatuses";
import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import {IPlayer} from "../interfaces/IPlayer";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import ResourcesUtils from "./ResourcesUtils";
import ResourceTypesUtil from "./ResourceTypesUtils";

export default class PlayersUtils {
	public static getPlayerByName(name:string):IPlayer {
		return swttStore.players.players.find(player => player.name === name);
	}

	public static getPlayerScore(player:IPlayer):number {
		const resourceType:ResourceTypes = swttStore.resourceTypes.selectedResourceType;
		const resourceWinningStat:IResourceWinningStat = ResourceTypesUtil.getResourceTypeWinningStat(resourceType);
		return ResourcesUtils.getStatPower(player.resource.id, resourceType, resourceWinningStat.name);
	}

	public static getPlayerFightStatus(player:IPlayer):FightStatuses {
		const fightWinners:Players[] = swttStore.fight.fightWinners;
		const winnersCount:number = fightWinners.length;

		if (winnersCount == 0)
			return FightStatuses.TIE;

		const playersCount:number = swttStore.players.playersCount;
		const isWinner:boolean = fightWinners.includes(player.name);

		if (winnersCount < playersCount && isWinner)
			return FightStatuses.WINNER;
		else if (winnersCount === playersCount && isWinner)
			return FightStatuses.TIE;
		else
			return FightStatuses.LOOSER;

	}
}
