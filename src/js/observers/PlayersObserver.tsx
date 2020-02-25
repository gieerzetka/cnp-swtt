import {observer} from "mobx-react";
import * as React from "react";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import WinnersList from "../components/WinnersList";
import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../store/RootStore";
import PlayerObserver from "./PlayerObserver";

@observer
export default class PlayersObserver extends React.Component<{}, {}> {
	private getContent = () => {
		switch (swttStore.fight.fightStatus) {
			case FetchStatuses.PRISTINE:
				return null;
			case FetchStatuses.PENDING:
				return <Spinner
						type='light'
						containerClasses='d-flex justify-content-center mb-5'
					/>;
			case FetchStatuses.ERROR:
				return <ErrorMessage />;
			default:
				return <div className="PlayersObserver">
					<WinnersList
						key="winnersList"
						additionalClasses="mb-5"
					/>
					<div className="row mb-5">
						{this.generatePlayers()}
					</div>
				</div>;
		}
	};

	private generatePlayers = () => {
		return swttStore.players.players.map(player => {
			return <PlayerObserver
				key={player.name}
				player={player}
			/>;
		});
	};

	public render() {
		return this.getContent();
	}
}
