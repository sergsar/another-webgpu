/*
 * Partly has Gregg Tavares code - Copyright 2022 Gregg Tavares
 */

class Vector2Utils {
	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static add(a, b, dst = new Float32Array(2)) {
		dst[0] = a[0] + b[0];
		dst[1] = a[1] + b[1];

		return dst;
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 */
	static dot(a, b) {
		return a[0] * b[0] + a[1] * b[1];
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 */
	static sign(a) {
		return Math.sign(a[0]) * Math.sign(a[1]);
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static subtract(a, b, dst = new Float32Array(2)) {
		dst[0] = a[0] - b[0];
		dst[1] = a[1] - b[1];

		return dst;
	}

	/**
	 * @param {Float32Array} v
	 * @param {Float32Array} [dst]
	 */
	static normalize(v, dst = new Float32Array(2)) {
		const length = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
		// make sure we don't divide by 0.
		if (length > 0.00001) {
			dst[0] = v[0] / length;
			dst[1] = v[1] / length;
		} else {
			dst[0] = 0;
			dst[1] = 0;
		}

		return dst;
	}

	static length(v = new Float32Array(2)) {
		const v0 = v[0];
		const v1 = v[1];
		return Math.sqrt(v0 * v0 + v1 * v1);
	}

	static setLength(v = new Float32Array(2), l = 1, dst = new Float32Array(2)) {
		this.normalize(v, dst);
		this.multiplyScalar(dst, l, dst);
	}

	static multiplyScalar(
		v = new Float32Array(2),
		k = 1,
		dst = new Float32Array(2),
	) {
		dst[0] = v[0] * k;
		dst[1] = v[1] * k;
		return dst;
	}
}

export {Vector2Utils};
