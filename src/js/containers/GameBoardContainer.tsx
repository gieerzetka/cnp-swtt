import {observer} from "mobx-react";
import * as React from "react";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import {GameStatuses} from "../data/GameStatuses";
import {swttStore} from "../index";
import GameUtil from "../utils/GameUtil";
import NewGameContainer from "./NewGameContainer";
import PlayersContainer from "./PlayersContainer";

@observer
export default class GameBoardContainer extends React.Component<{}, {}> {
	public componentDidMount():void {
		GameUtil.loadGame();
	}

	private getContent = () => {
		switch (swttStore.game.loadingGame) {
			case GameStatuses.ERROR:
				return <ErrorMessage
					primaryMessage='¯\_( ͡─ Ĺ̯ ͡─)_/¯'
					secondaryMessage="Game could not load all necessary data. Please reload page to try again."
				/>;
			case GameStatuses.PENDING:
				return <Spinner
					type='light'
					containerClasses='d-flex justify-content-center mb-5'
				/>;
			case GameStatuses.PRISTINE:
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
