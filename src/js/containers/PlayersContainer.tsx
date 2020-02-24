import {observer} from "mobx-react";
import * as React from "react";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import {GameStatuses} from "../data/GameStatuses";
import {swttStore} from "../index";
import PlayerContainer from "./PlayerContainer";

@observer
export default class PlayersContainer extends React.Component<{}, {}> {
	private getContent = () => {
		switch (swttStore.game.fightStatus) {
			case GameStatuses.PRISTINE:
				return null;
			case GameStatuses.PENDING:
				return <Spinner
						type='light'
						containerClasses='d-flex justify-content-center mb-5'
					/>;
			case GameStatuses.ERROR:
				return <ErrorMessage />;
			default:
				return <div className="row mb-5">
					{this.generatePlayers()}
				</div>;
		}
	};

	private generatePlayers = () => {
		return swttStore.players.players.map(player => {
			return <PlayerContainer
				key={player.name}
				player={player}
			/>;
		});
	};

	public render() {
		return this.getContent();
	}
}
