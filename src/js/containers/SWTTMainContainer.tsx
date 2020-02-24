import * as React from "react";
import GamePageHeader from "../components/GamePageHeader";
import GameBoardContainer from "./GameBoardContainer";

export default class SWTTMainContainer extends React.Component<{}, {}>{
	public render () {
		return <section className="SWTTMainContainer container d-flex flex-column">
			<GamePageHeader/>
			<GameBoardContainer/>
		</section>;
	}
}
