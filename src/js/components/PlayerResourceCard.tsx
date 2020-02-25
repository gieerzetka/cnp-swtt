import * as React from "react";
import {FightStatuses} from "../data/FightStatuses";
import {ResourceTypes} from "../data/ResourceTypes";
import {IResource} from "../interfaces/IResource";
import IResourceWinningStat from "../interfaces/IResourceWinningStat";
import {swttStore} from "../store/RootStore";
import Badge from "./Badge";

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

		classes += ` bg-${style}`;

		return classes;
	}

	public render() {
		const {resourceType, resourceId} = this.props;
		const resource:IResource = swttStore.resources.getResourceByIdAndType(resourceId, resourceType);
		const resourceWinningStat:IResourceWinningStat = swttStore.resourceTypes.getResourceTypeWinningStat(resourceType);
		const statPower:string = swttStore.resources.getStatPower(resourceId, resourceType, resourceWinningStat.name).toString();

		return <section className={this.getCardClasses()}>
			<header className="card-header">
				{resource.data.name}
			</header>
			<section className="card-body">
				<span>{resourceWinningStat.displayName}:</span>
				<Badge
					text={statPower}
					additionalClasses={'badge-pill badge-light pb-2 pt-2'}
				/>
			</section>
		</section>;
	}
}
