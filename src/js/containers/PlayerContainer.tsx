import {observer} from "mobx-react";
import * as React from "react";
import PlayerResourceCard from "../components/PlayerResourceCard";
import {IPlayer} from "../interfaces/IPlayer";
import PlayersUtils from "../utils/PlayersUtils";

interface IPlayerContainerProps {
	player:IPlayer
}

@observer
export default class PlayerContainer extends React.Component<IPlayerContainerProps, {}> {
	public render() {
 		const {player} = this.props;
		return <section className="PlayerContainer col d-flex flex-column">
			<header className="d-flex flex-row align-items-center justify-content-between pb-2">
				<h1 className="h4 text-light">{player.name}</h1>
				<span className="text-muted h4">Wins: {player.score}</span>
			</header>
			<PlayerResourceCard
				resourceId={player.resource.id}
				resourceType={player.resource.type}
				fightStatus={PlayersUtils.getPlayerFightStatus(player)}
			/>
		</section>;
	}
}
