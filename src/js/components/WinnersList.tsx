import * as React from "react";
import {Players} from "../data/Players";
import {swttStore} from "../index";

interface IWinnersList {
	additionalClasses?:string;
}

export default class WinnersList extends React.Component<IWinnersList, {}>{
	private generateWinnersStatement():string {
		const winners:Players[] = swttStore.fight.fightWinners;
		const winnersCount = winners.length;
		const playersCount = swttStore.players.playersCount;

		let winnersStatement:string;
		if (winnersCount === 0 || winnersCount === playersCount)
			winnersStatement = 'TIE';
		else if (winnersCount < playersCount && winnersCount > 1)
			winnersStatement = `Winners: ${winners.join(', ')}`;
		else if (winnersCount < playersCount && winnersCount === 1)
			winnersStatement = `Winner: ${winners.join(', ')}`;
		return winnersStatement;
	}

	public render() {
		const {additionalClasses} = this.props;
		return <h2 className={`WinnersList text-light text-center ${additionalClasses}`}>{this.generateWinnersStatement()}</h2>
	}
}
