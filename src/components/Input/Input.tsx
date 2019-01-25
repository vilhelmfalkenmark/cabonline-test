import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';

const s = classNames.bind(styles);

interface Props {
	label: string;
	name: boolean;
	type: boolean;
	onChangeCallback: ((string) => string);
	value: string;
	placeholder: string;
	className: string;
}

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
