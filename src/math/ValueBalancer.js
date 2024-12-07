class ValueBalancer {
	/**
	 * @param {Object} [args]
	 * @param {(() => boolean) | undefined} [args.condition]
	 * @param {(() => boolean) | undefined} [args.inversion]
	 */
	constructor(args = {}) {
		let condition = args.condition || (() => true);
		let inversion = args.inversion;

		let passed = true;

		let previous = 0;
		let diff = 0;

		this.balanced = 0;

		this.reset = () => {
			this.balanced = 0;
			diff = 0;
			passed = true;
		};

		this.setValue = (value = 0) => {
			if (!this.balanced) {
				this.balanced = value;
				previous.copy(value);
			}

			passed = condition() || inversion();

			if (!passed) {
				this.balanced = previous;
				diff = value - this.balanced;
			} else {
				previous = this.balanced;
			}

			this.balanced = value - diff;
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

export {ValueBalancer};
