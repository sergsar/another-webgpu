/*
 * Partly has Gregg Tavares code - Copyright 2022 Gregg Tavares
 */

class Vector3Utils {
	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static cross(a, b, dst = new Float32Array(3)) {
		const t0 = a[1] * b[2] - a[2] * b[1];
		const t1 = a[2] * b[0] - a[0] * b[2];
		const t2 = a[0] * b[1] - a[1] * b[0];

		dst[0] = t0;
		dst[1] = t1;
		dst[2] = t2;

		return dst;
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static subtract(a, b, dst = new Float32Array(3)) {
		dst[0] = a[0] - b[0];
		dst[1] = a[1] - b[1];
		dst[2] = a[2] - b[2];

		return dst;
	}

	/**
	 * @param {Float32Array} v
	 * @param {Float32Array} [dst]
	 */
	static normalize(v, dst = new Float32Array(3)) {
		const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		// make sure we don't divide by 0.
		if (length > 0.00001) {
			dst[0] = v[0] / length;
			dst[1] = v[1] / length;
			dst[2] = v[2] / length;
		} else {
			dst[0] = 0;
			dst[1] = 0;
			dst[2] = 0;
		}

		return dst;
	}

	/**
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} c
	 * @param {Float32Array} [dst]
	 */
	static computeNormal(a, b, c, dst = new Float32Array(3)) {
		const first = this.subtract(b, a);
		const second = this.subtract(c, a);
		const cross = this.cross(first, second);
		return this.normalize(cross, dst);
	}
}

export {Vector3Utils}
