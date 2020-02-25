import * as React from "react";
import ISelectValue from "../interfaces/ISelectValues";

interface ISelect {
	handleOnChange?:(event:React.FormEvent<HTMLSelectElement>) => void;
	labelText?:string;
	value:string;
	isDisabled?:boolean;
	selectValues:ISelectValue[]
}

export default class Select extends React.Component<ISelect, {}> {
	private handleChange = (event:React.FormEvent<HTMLSelectElement>) => {
		this.props.handleOnChange(event);
	};

	private generateOptions = () => {
		return this.props.selectValues.map(selectValue => {
			return this.getOption(selectValue)
		});
	};

	private getOption = (selectValue:ISelectValue) => {
		return <option
			className="bg-dark text-uppercase"
			key={selectValue.name}
			value={selectValue.name}
		>
			{selectValue.name}
		</option>
	};

	public render() {
		const {labelText, value, isDisabled} = this.props;
		return (
			<div className="Select col">
				<label className="text-light">
					<span>{labelText ? `${labelText}:` : ''}</span>
					<select
						className="ml-2 pl-3 pr-3 pt-2 pb-2 bg-transparent text-light text-uppercase"
						onChange={this.handleChange}
						value={value}
						disabled={isDisabled}
					>
						{this.generateOptions()}
					</select>
				</label>
			</div>
		);
	}
}
