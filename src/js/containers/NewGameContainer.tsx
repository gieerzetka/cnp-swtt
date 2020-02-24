import * as React from "react";
import PlayButton from "../components/PlayButton";
import ResourceSelector from "../components/ResourceSelector";

export default class NewGameContainer extends React.Component<{}, {}> {
	public render() {
		return <div className="row mb-5 align-items-center">
			<ResourceSelector/>
			<PlayButton/>
		</div>;
	}
}
