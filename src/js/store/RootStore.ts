import {configure} from "mobx";
import FightStore from "./FightStore";
import GameStore from "./GameStore";
import PlayersStore from "./PlayersStore";
import ResourcesStore from "./ResourcesStore";
import ResourceTypesStore from "./ResourceTypesStore";

configure({ enforceActions: 'observed' });
export const swttStore = {
	resources: new ResourcesStore(),
	resourceTypes: new ResourceTypesStore(),
	players: new PlayersStore(),
	game: new GameStore(),
	fight: new FightStore(),
};
