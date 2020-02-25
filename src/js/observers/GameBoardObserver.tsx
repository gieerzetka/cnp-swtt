import {observer} from "mobx-react";
import * as React from "react";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../store/RootStore";
import NewGameObserver from "./NewGameObserver";
import PlayersObserver from "./PlayersObserver";

@observer
export default class GameBoardObserver extends React.Component<{}, {}> {
	public componentDidMount() {
		swttStore.game.loadGame();
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
					<PlayersObserver key="playersContainer"/>,
					<NewGameObserver key="newGameContainer"/>
				]
		}
	};

	public render() {
		return <section className="GameBoardObserver d-flex flex-column">
			{this.getContent()}
		</section>;
	}
}
