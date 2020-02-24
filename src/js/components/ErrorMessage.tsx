import * as React from "react";

interface IErrorMessage {
	primaryMessage?:string;
	secondaryMessage?:string;
}

export default class ErrorMessage extends React.Component<IErrorMessage, {}>{
	public getPrimaryMessage() {
		const {primaryMessage} = this.props;
		return primaryMessage ? primaryMessage : '(╯ ͡⊗ ₒ ͡⊗)╯┻━┻';
	}

	public getSecondaryMessage() {
		const {secondaryMessage} = this.props;
		return secondaryMessage ? secondaryMessage : 'Oops... something went wrong... Please try again!';
	}

	public render() {
		return <section className="d-flex flex-column justify-content-center mb-5">
			<h1 className="display-4 text-light text-center pb-4">{this.getPrimaryMessage()}</h1>
			<p className="text-light text-center">{this.getSecondaryMessage()}</p>
		</section>;
	}
}
