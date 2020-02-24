import {Players} from "../data/Players";
import {ResourceTypes} from "../data/ResourceTypes";

export interface IPlayer {
	name:Players;
	score:number;
	resource:{
		id: number,
		type:ResourceTypes
	}
}
