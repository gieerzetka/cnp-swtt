import * as React from "react";
import Spinner from "./Spinner";

interface IButton {
	handleOnClick?:() => void;
	isDisabled?:boolean;
	buttonText:string;
	isLoading?:boolean;
	additionalClasses?:string;
}

export default class Button extends React.Component<IButton, {}> {
	private handleButtonClick = () => {
		const {handleOnClick} = this.props;
		if (handleOnClick)
			handleOnClick();
	};

	private getSpinner() {
		if (!this.props.isLoading)
			return null;

		return <Spinner
			type="success"
			key="buttonSpinner"
			containerClasses="mr-3"
		/>;
	}

	private getText() {
		return <span
			className="h2 mb-0"
			key="buttonText"
		>
			{this.props.buttonText}
		</span>
	}

	public render() {
		const {isDisabled, additionalClasses} = this.props;
		return <div className="Button col">
			<button
				className={`btn ${additionalClasses}`}
				onClick={this.handleButtonClick}
				disabled={isDisabled}
			>
				{this.getSpinner()}
				{this.getText()}
			</button>
		</div>;
	}
}
