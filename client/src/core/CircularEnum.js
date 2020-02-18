import { SequentialEnum } from './SequentialEnum';

export class CircularEnum extends SequentialEnum {
	after(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		const thisIndex = this.indexOf(sym);
		const nextIndex = (thisIndex + 1) % this.count;
		return this[this.keys[nextIndex]];
	}

	before(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		const thisIndex = this.indexOf(sym);
		let prevIndex = thisIndex - 1;
		if (prevIndex === -1) {
			prevIndex = this.count - 1;
		}
		return this[this.keys[prevIndex]];
	}

	opposite(sym) {
		if (!this.contains(sym)) {
			return null;
		}
		const thisIndex = this.indexOf(sym);
		const oppositeIndex = (thisIndex + Math.floor(this.count / 2)) % this.count;
		return this[this.keys[oppositeIndex]];
	}
}
