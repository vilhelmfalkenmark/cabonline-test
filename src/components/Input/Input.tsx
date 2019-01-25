import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';

const s = classNames.bind(styles);

type Props = {
	label: String;
	name: Boolean;
	type: Boolean;
	onChangeCallback: Function;
	value: String;
	placeholder: String;
	className: String;
};

const Input: React.FunctionComponent<Props> = ({
	label,
	name = '',
	type = 'text',
	onChangeCallback,
	value = '',
	placeholder = '',
	className
}) => (
	<div className={s('container', { [className]: className })}>
		{label && (
			<label htmlFor={name} className={s('label')}>
				{label}
			</label>
		)}
		<input
			className={s('input')}
			placeholder={placeholder}
			name={name}
			type={type}
			onChange={onChangeCallback}
			value={value}
		/>
	</div>
);

export default Input;
