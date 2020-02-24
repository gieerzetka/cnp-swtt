import *  as React from "react";

interface IBadge {
	text:string;
	additionalClasses?:string;
}

export default class Badge extends React.Component<IBadge, {}>{
	public render() {
		const {text, additionalClasses} = this.props;
		return <span className={`Badge badge ${additionalClasses}`}>{text}</span>
	}
}
