class BalancedValue {
	constructor({min = 0, max = 1, value = 0} = {}) {
		let unbalanced = value;
		this.balanced = value;

		let diff = 0;

		this.reset = () => {
			diff = 0;
			unbalanced = this.balanced;
		};

		this.setValue = (value = 0) => {
			unbalanced = value;
			this.balanced = Math.max(Math.min(value - diff, max), min);
			diff = value - this.balanced;
		};

		this.getValue = () => {
			return unbalanced;
		};
	}
}

export {BalancedValue};
