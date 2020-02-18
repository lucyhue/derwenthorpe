const UNKNOWN_USER = 'Unknown User';

export const userHelpers = {

	getFullName: (user) => {
		if (!user) return UNKNOWN_USER;
		const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
		return fullName.length > 0 ? fullName : UNKNOWN_USER;
	},

	getInitials: (user) => {
		if (!user) return '';
		const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
		const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
		return `${firstInitial}${lastInitial}`;
	},

};
