import {observer} from "mobx-react";
import * as React from "react";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../index";
import GameUtils from "../utils/GameUtils";
import NewGameContainer from "./NewGameContainer";
import PlayersContainer from "./PlayersContainer";

@observer
export default class GameBoardContainer extends React.Component<{}, {}> {
	public async componentDidMount():Promise<void> {
		await GameUtils.loadGame();
	}

	private getContent = () => {
		switch (swttStore.game.loadingGame) {
			case FetchStatuses.ERROR:
				return <ErrorMessage
					primaryMessage='¯\_( ͡─ Ĺ̯ ͡─)_/¯'
					secondaryMessage="Game could not load all necessary data. Please reload page and try again."
				/>;
			case FetchStatuses.PENDING:
				return <Spinner
					type='light'
					containerClasses='d-flex justify-content-center mb-5'
				/>;
			case FetchStatuses.PRISTINE:
				return <p className="text-light text-center">Game should start loading soon.</p>;
			default:
				return [
					<PlayersContainer key="playersContainer"/>,
					<NewGameContainer key="newGameContainer"/>
				]
		}
	};

	public render() {
		return <section className="GameBoardContainer d-flex flex-column">
			{this.getContent()}
		</section>;
	}
}
