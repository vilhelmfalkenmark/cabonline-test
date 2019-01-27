import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.scss';
import { InputEntity } from 'model/inputEntity';

const s = classNames.bind(styles);

interface Props {
	label: string;
	name: string;
	type?: string;
	onChangeCallback: ((InputEntity) => InputEntity);
	value: string;
	placeholder: string;
	className: string;
	autoFocus: boolean;
}

const Input: React.FunctionComponent<Props> = ({
	label,
	name = '',
	type = 'text',
	onChangeCallback,
	value = '',
	autoFocus,
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
			autoFocus={autoFocus}
			type={type}
			onChange={onChangeCallback}
			value={value}
		/>
	</div>
);

export default Input;
