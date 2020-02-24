import * as React from "react";
import {IPlayer} from "../interfaces/IPlayer";
import CardContainer from "./CardContainer";

interface IPlayerContainerProps {
	player:IPlayer
}

export default class PlayerContainer extends React.Component<IPlayerContainerProps, {}> {
	public render() {
 		const {player} = this.props;
		return <section className="PlayerContainer col d-flex flex-column">
			<header className="d-flex flex-row align-items-center justify-content-between pb-2">
				<h1 className="h4 text-light">{player.name}</h1>
				<span className="text-muted h4">Wins: {player.score}</span>
			</header>
			<CardContainer />
		</section>;
	}
}
