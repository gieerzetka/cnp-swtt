import {configure} from "mobx";
import * as React from "react";
import * as ReactDOM from "react-dom";
import '../styles/main.scss';
import SWTTMainContainer from "./containers/SWTTMainContainer";
import GameStore from "./store/GameStore";
import PlayersStore from "./store/PlayersStore";
import ResourcesStore from "./store/ResourcesStore";

configure({ enforceActions: 'observed' });
export const swttStore = {
	resources: new ResourcesStore(),
	players: new PlayersStore(),
	game: new GameStore(),
};

const Root = () => (
	<SWTTMainContainer/>
);

ReactDOM.render(
	<Root/>,
	document.getElementById("app")
);
