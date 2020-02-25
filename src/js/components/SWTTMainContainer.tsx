import * as React from "react";
import GamePageHeader from "./GamePageHeader";
import GameBoardObserver from "../observers/GameBoardObserver";

export default class SWTTMainContainer extends React.Component<{}, {}>{
	public render () {
		return <section className="SWTTMainContainer container d-flex flex-column">
			<GamePageHeader/>
			<GameBoardObserver/>
		</section>;
	}
}
