import {observer} from "mobx-react";
import * as React from "react";
import {FetchStatuses} from "../data/FetchStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import {swttStore} from "../index";
import IResourceType from "../interfaces/IResourceType";

@observer
export default class ResourceSelector extends React.Component<{}, {}> {
	private handleChange = (event:React.FormEvent<HTMLSelectElement>) => {
		const newValue:ResourceTypes = event.currentTarget.value as ResourceTypes;
		swttStore.resourceTypes.changeSelectedResourceType(newValue);
	};

	private generateResourceOptions = () => {
		return swttStore.resourceTypes.resourceTypes.map(resource => {
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
					onChange={this.handleChange}
					value={swttStore.resourceTypes.selectedResourceType}
					disabled={swttStore.fight.fightStatus === FetchStatuses.PENDING}
				>
					{this.generateResourceOptions()}
				</select>
			</div>
		);
	}
}
