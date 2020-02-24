import {configure} from "mobx";
import * as React from "react";
import * as ReactDOM from "react-dom";
import '../styles/main.scss';
import SWTTMainContainer from "./containers/SWTTMainContainer";
import FightStore from "./store/FightStore";
import GameStore from "./store/GameStore";
import PlayersStore from "./store/PlayersStore";
import ResourcesStore from "./store/ResourcesStore";
import ResourceTypesStore from "./store/ResourceTypesStore";

configure({ enforceActions: 'observed' });
export const swttStore = {
	resources: new ResourcesStore(),
	resourceTypes: new ResourceTypesStore(),
	players: new PlayersStore(),
	game: new GameStore(),
	fight: new FightStore(),
};

const Root = () => (
	<SWTTMainContainer/>
);

ReactDOM.render(
	<Root/>,
	document.getElementById("app")
);
