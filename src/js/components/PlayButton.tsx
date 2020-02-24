import {observer} from "mobx-react";
import * as React from "react";
import {FetchStatuses} from "../data/FetchStatuses";
import {swttStore} from "../index";
import FightUtils from "../utils/FightUtils";
import Spinner from "./Spinner";

@observer
export default class PlayButton extends React.Component<{}, {}> {
	private handleButtonClick = async () => {
		await FightUtils.startFight();
	};

	private generateButtonContent() {
		const fightStatus:FetchStatuses = swttStore.fight.fightStatus;
		const isPending:boolean = fightStatus === FetchStatuses.PENDING;
		const isPristine:boolean = fightStatus === FetchStatuses.PRISTINE;
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
				disabled={swttStore.fight.fightStatus === FetchStatuses.PENDING}
			>
				{this.generateButtonContent()}
			</button>
		</div>;
	}
}
