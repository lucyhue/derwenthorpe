import { useState } from 'react';
import isEqual from 'lodash.isequal';
import { validators } from 'core/validators';

/**
 * initialState = {
 *   key: value,
 *   ...
 * }
 * validationRules = {
 *   key: {
 *     validateOn: 'focus'|'change'|'blur'|'any', // default = blur
 *     rules: [
 *       {
 *         validator: 'name of validator',
 *         compareWith: value,
 *         error: 'error message',
 *       },
 *       ...
 *     ],
 *   },
 *   ...
 * }
 *
 * returns: [
 *   eventHandlers: {
 *     handleFocus: (event) => {},
 *     handleChange: (event) => {},
 *     handleBlur: (event) => {},
 *   },
 *   selectors = {
 *     wasTouched: (key) => bool,
 *     isDirty: (key) => bool,
 *     isValid: (key) => bool,
 *     errors: (key) => string,
 *     isAnyDirty: () => bool,
 *     areAllValid: () => bool,
 *   }
 * ]
 */

export function useValidatedState(initialState, validationRules = {}) {

	const instrumentedState = Object.keys(initialState).reduce((obj, key) => {
		obj[key] = {
			value: initialState[key],
			dataType: typeof initialState[key],
			wasTouched: false,
			isDirty: false,
			isValidated: false,
			errors: [],
		};
		return obj;
	}, {});

	const [validatedState, setValidatedState] = useState(instrumentedState);

	const selectors = {
		value: (key) => validatedState[key].value,
		wasTouched: (key) => validatedState[key].wasTouched,
		isDirty: (key) => validatedState[key].isDirty,
		isValidated: (key) => validatedState[key].isValidated,
		isValid: (key) => !selectors.isValidated(key) || validatedState[key].errors.length === 0,
		errors: (key) => validatedState[key].errors.join(' '),
		isAnyDirty: () => Object.keys(validatedState).some((key) => selectors.isDirty(key) === true),
		areAllValid: () => selectors.isAnyDirty() && !Object.keys(validatedState).some((key) => selectors.isValid(key) === false),
		validState: () => Object.keys(validatedState).reduce((obj, key) => { obj[key] = validatedState[key].value; return obj; }, {}),
	}

	const extractNameAndValue = (event) => {
		const { name, value } = event.target;
		const useValue = (validatedState[name].dataType === 'boolean') ? event.target.checked : value;
		return { name, value: useValue };
	}

	const withValidation = (stateUpdates, eventType, name, value) => {

		const { validateOn = 'blur' } = validationRules[name];
		if (eventType !== validateOn && eventType !== 'any') {
			return stateUpdates;
		}

		let isValidated = false;
		const errors = [];

		const { rules } = validationRules[name];
		if (rules && rules.length > 0) {

			// if any rule fails add error to the list
			rules.forEach((rule) => {

				const validator = validators[rule.validator];
				const isValid = validator(value, rule);
				if (!isValid) {
					errors.push(rule.error);
				}
				isValidated = true;
			});

		}

		return {
			...stateUpdates,
			isValidated,
			errors,
		};
	}

	const updateState = (name, nameStateUpdates) => {

		const newNameState = {
			...validatedState[name],
			...nameStateUpdates,
		};

		if (!isEqual(newNameState, validatedState[name])) {
			setValidatedState({
				...validatedState,
				[name]: newNameState,
			});
		}
	}

	const eventHandlers = {

		focus: (event) => {
			event.preventDefault();
			const { name, value } = extractNameAndValue(event);

			const stateUpdates = withValidation(
				{ wasTouched: true },
				'focus',
				name,
				value
			);

			updateState(name, stateUpdates);
		},

		change: (event) => {
			event.preventDefault();
			const { name, value } = extractNameAndValue(event);

			const stateUpdates = withValidation(
				{ value, isDirty: true },
				'change',
				name,
				value
			);

			updateState(name, stateUpdates);
		},

		blur: (event) => {
			event.preventDefault();
			const { name, value } = extractNameAndValue(event);

			const stateUpdates = withValidation(
				{},
				'blur',
				name,
				value
			);

			updateState(name, stateUpdates);
		},

		validateAll: () => {
			Object.keys(validatedState).forEach((key) => {
				const { value, isValidated } = validatedState[key];
				if (isValidated) {
					return;
				}

				const stateUpdates = withValidation(
					{},
					'any',
					key,
					value
				);

				updateState(key, stateUpdates);
			});
		},

	};

	return [eventHandlers, selectors];
}
