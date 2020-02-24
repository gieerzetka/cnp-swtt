import * as React from "react";
import {FightStatuses} from "../data/FightStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import {IResource} from "../interfaces/IResource";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import ResourcesUtils from "../utils/ResourcesUtils";
import ResourceTypesUtil from "../utils/ResourceTypesUtils";

interface ICardContainer {
	resourceType:ResourceTypes,
	resourceId:number,
	fightStatus:FightStatuses
}

export default class PlayerResourceCard extends React.Component<ICardContainer, {}> {
	private getCardClasses():string {
		const {fightStatus} = this.props;
		let classes:string = "CardContainer card p-2";
		let style:string = 'info';

		switch (fightStatus) {
			case FightStatuses.WINNER:
				style = 'success';
				break;
			case FightStatuses.LOOSER:
				style = 'secondary'
		}

		classes += `bg-${style}`;

		return classes;
	}

	public render() {
		const {resourceType, resourceId} = this.props;
		const resource:IResource = ResourcesUtils.getResourceByIdAndType(resourceId, resourceType);
		const resourceWinningStat:IResourceWinningStat = ResourceTypesUtil.getResourceTypeWinningStat(resourceType);
		const statPower:number = ResourcesUtils.getStatPower(resourceId, resourceType, resourceWinningStat.name);

		return <section className={this.getCardClasses()}>
			<header className="card-header">
				{resource.data.name}
			</header>
			<section className="card-body">
				{resourceWinningStat.displayName}: {statPower}
			</section>
		</section>;
	}
}
