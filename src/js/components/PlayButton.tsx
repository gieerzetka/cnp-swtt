import {observer} from "mobx-react";
import * as React from "react";
import {GameStatuses} from "../data/GameStatuses";
import {swttStore} from "../index";
import GameUtil from "../utils/GameUtil";
import Spinner from "./Spinner";

@observer
export default class PlayButton extends React.Component<{}, {}> {
	private handleButtonClick = () => {
		GameUtil.startFight();
	};

	private generateButtonContent() {
		const isPending:boolean = swttStore.game.fightStatus === GameStatuses.PENDING;
		const isPristine:boolean = swttStore.game.fightStatus === GameStatuses.PRISTINE;
		return [
			this.getSpinner(isPending),
			this.getText(isPristine)
		];
	}

	private getSpinner(isPending:boolean) {
		return isPending && <Spinner
			type="success"
			key="buttonSpinner"
			containerClasses="mr-3"
		/>;
	}

	private getText(isPristine:boolean) {
		return <span
			className="h2 mb-0"
			key="buttonText"
		>
				Play{!isPristine && ' again'}!
		</span>
	}

	public render() {
		return <div className="PlayButton col">
			<button
				className="btn btn-outline-success pb-2 pt-2 pl-4 pr-4 d-flex"
				onClick={this.handleButtonClick}
				disabled={swttStore.game.fightStatus === GameStatuses.PENDING}
			>
				{this.generateButtonContent()}
			</button>
		</div>;
	}
}
