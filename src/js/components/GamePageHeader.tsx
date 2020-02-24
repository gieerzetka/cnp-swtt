import * as React from "react";

export default class GamePageHeader extends React.Component<{}, {}> {
	public render() {
		return <header className="GamePageHeader pt-5 pb-5">
			<h1 className="text-center text-uppercase">Star Wars Top Trumps</h1>
		</header>;
	}
}
