import {observer} from "mobx-react";
import * as React from "react";
import Button from "../components/Button";
import Select from "../components/Select";
import {FetchStatuses} from "../data/FetchStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import ISelectValues from "../interfaces/ISelectValues";
import {swttStore} from "../store/RootStore";

@observer
export default class NewGameObserver extends React.Component<{}, {}> {
	private changeSelectedResourceType = (event:React.FormEvent<HTMLSelectElement>) => {
		const newValue:ResourceTypes = event.currentTarget.value as ResourceTypes;
		swttStore.resourceTypes.changeSelectedResourceType(newValue);
	};

	private generateResourceSelectOptions = ():ISelectValues[] => {
		return swttStore.resourceTypes.resourceTypes.map(resource => {
			return {
				name: resource.name,
				value: resource.name
			}
		});
	};

	private startNewGame = () => {
		swttStore.fight.startFight();
	};

	private getButtonText(isPristine:boolean) {
		if (isPristine)
			return 'Play!';

		return 'Play again!';
	}

	public render() {
		const fightStatus:FetchStatuses = swttStore.fight.fightStatus;
		const isPristine:boolean = fightStatus === FetchStatuses.PRISTINE;
		const isLoading:boolean = fightStatus === FetchStatuses.PENDING;
		return <div className="NewGameObserver row mb-5 align-items-center">
			<Select
				handleOnChange={this.changeSelectedResourceType}
				labelText='Select resource'
				value={swttStore.resourceTypes.selectedResourceType}
				isDisabled={fightStatus === FetchStatuses.PENDING}
				selectValues={this.generateResourceSelectOptions()}
			/>
			<Button
				handleOnClick={this.startNewGame}
				isDisabled={fightStatus === FetchStatuses.PENDING}
				buttonText={this.getButtonText(isPristine)}
				isLoading={isLoading}
				additionalClasses='btn-outline-success pb-2 pt-2 pl-4 pr-4 d-flex'
			/>
		</div>;
	}
}
