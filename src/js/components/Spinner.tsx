import * as React from "react";

interface ISpinnerProps {
	type: 'success' | 'light',
	containerClasses?:string
}

export default class Spinner extends React.Component<ISpinnerProps, {}>{
	public render() {
		const spinnerClasses = `spinner-border text-${this.props.type}`;
		return <div className={this.props.containerClasses}>
			<div
				className={spinnerClasses}
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>;
	}
}
