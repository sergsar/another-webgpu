class RangeLimiter {
	constructor({min = -Infinity, max = Infinity} = {}) {
		let lowerBound = min;
		let upperBound = max;
		let offset = 0;
		let raw = 0;
		let clamped = 0;

		this.setRange = (min = -Infinity, max = Infinity) => {
			lowerBound = min;
			upperBound = max;
		};

		this.reset = () => {
			offset = 0;
		};

		this.apply = (value = 0) => {
			raw = value + offset;
			clamped = Math.min(Math.max(raw, lowerBound), upperBound);
			offset += clamped - raw;
			return clamped;
		};

		Object.defineProperties(this, {
			setRange: {writable: false},
			reset: {writable: false},
			apply: {writable: false},
		});
	}
}

export {RangeLimiter};
