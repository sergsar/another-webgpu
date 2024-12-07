import {Vector2} from './Vector2.js';

class Vector2Balancer {
	/**
	 * @param {Object} [args]
	 * @param {(() => boolean) | undefined} [args.condition]
	 * @param {(() => boolean) | undefined} [args.inversion]
	 */
	constructor(args = {}) {
		let condition = args.condition || (() => true);
		let inversion = args.inversion;

		let passed = true;

		const previous = new Vector2();
		const value = new Vector2();
		const diff = new Vector2();

		this.balanced = new Vector2();

		this.reset = () => {
			this.balanced.set(0, 0);
			// value.copy(this.balanced);
			diff.set(0, 0);
			passed = true;
		};

		this.setValue = (x = 0, y = 0) => {
			value.set(x, y);
			if (!this.balanced.length) {
				this.balanced.copy(value);
				previous.copy(value);
			}

			passed = condition() || inversion();

			if (!passed) {
				this.balanced.copy(previous);
				diff.copy(value).subtract(this.balanced);
			} else {
				previous.copy(this.balanced);
			}

			this.balanced.copy(value).subtract(diff);
		};

		this.setCondition = (value = () => true) => {
			if (typeof value !== 'function') {
				return;
			}
			condition = value;
		};

		this.setInversion = (value = () => true) => {
			if (typeof value !== 'function') {
				return;
			}
			inversion = value;
		};

		Object.defineProperties(this, {
			balanced: {writable: false},
		});
	}
}

export {Vector2Balancer};
