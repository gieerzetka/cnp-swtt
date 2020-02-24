import {observer} from "mobx-react";
import * as React from "react";
import {GameStatuses} from "../data/GameStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import IResourceType from "../interfaces/IResourceType";

@observer
export default class ResourceSelector extends React.Component<{}, {}> {

	private changeResource = (event:React.FormEvent<HTMLSelectElement>) => {
		const newValue:ResourceTypes = event.currentTarget.value as ResourceTypes;
		swttStore.resources.changeSelectedResourceType(newValue);
	};

	private generateResourceOptions = () => {
		return swttStore.resources.resourceTypes.map(resource => {
			return this.getOption(resource)
		});
	};

	private getOption = (resource:IResourceType) => {
		return <option
			className="bg-dark text-uppercase"
			key={resource.name}
		>
			{resource.name}
		</option>
	};

	public render() {
		return (
			<div className="ResourceSelector col">
				<span className="text-light">Select resource:</span>
				<select
					className="ml-2 pl-3 pr-3 pt-2 pb-2 bg-transparent text-light text-uppercase"
					onChange={this.changeResource}
					value={swttStore.resources.selectedResourceType}
					disabled={swttStore.game.fightStatus === GameStatuses.PENDING}
				>
					{this.generateResourceOptions()}
				</select>
			</div>
		);
	}
}
