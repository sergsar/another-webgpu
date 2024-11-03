import {Matrix4Utils} from './Matrix4Utils.js';

class Matrix4 {
	constructor(elements = Matrix4Utils.identity()) {
		Object.defineProperties(this, {
			elements: {
				value: elements,
			},
		});
	}

	copy(m = new Matrix4()) {
		this.elements.set(m.elements);
		return this;
	}

	inverse() {
		Matrix4Utils.inverse(this.elements, this.elements);
		return this;
	}
}

export {Matrix4};
