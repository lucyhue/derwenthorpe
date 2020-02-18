export const registeredModals = {};

/**
 * Registers a modal
 * @param {String} key of the modal
 * @param {component} modal to register
 * @returns {void}
 */
export function registerModal(key, modal) {
	registeredModals[key] = modal;
}
