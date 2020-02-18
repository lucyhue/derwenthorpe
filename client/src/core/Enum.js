export class Enum {
	constructor(...keys) {
		for (const key of keys) {
			this[key] = key; // Could use Symbol(key) here, but for ease of serialization we simply use the key;
		}
	}

	get keys() {
		return Object.keys(this);
	}

	get symbols() {
		return this.keys.map((key) => this[key]);
	}

	get count() {
		return this.keys.length;
	}

	indexOf(sym) {
		return this.keys.findIndex((key) => this[key] === sym);
	}

	keyOf(sym) {
		const index = this.indexOf(sym);
		return index === -1 ? undefined : this.keys[index];
	}

	contains(sym) {
		return this.indexOf(sym) !== -1;
	}

	random() {
		const randomIndex = Math.floor(Math.random() * this.count);
		return this.symbols[randomIndex];
	}
}
