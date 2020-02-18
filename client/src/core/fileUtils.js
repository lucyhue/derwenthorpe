export function extractExtension(filename) {
	const ext = /(?:\.([^.]+))?$/.exec(filename);
	if (ext != null && ext[0] != null) {
		return ext[0]
	} else {
		return ''
	}
}
