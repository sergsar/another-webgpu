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

	translate(x = 0, y = 0, z = 0) {
		Matrix4Utils.translate(this.elements, [x, y, z], this.elements);
		return this;
	}

	setPosition(x = 0, y = 0, z = 0) {
		this.elements[12] = x;
		this.elements[13] = y;
		this.elements[14] = z;
		return this;
	}
}

export {Matrix4};
