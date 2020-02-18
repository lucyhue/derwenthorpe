import { Enum } from './Enum';

export class SequentialEnum extends Enum {
	after(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		const thisIndex = this.indexOf(sym);
		const nextIndex = thisIndex + 1;
		if (nextIndex >= this.count) {
			return null;
		}
		return this[this.keys[nextIndex]];
	}

	before(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		const thisIndex = this.indexOf(sym);
		const prevIndex = thisIndex - 1;
		if (prevIndex < 0) {
			return null;
		}
		return this[this.keys[prevIndex]];
	}
}
