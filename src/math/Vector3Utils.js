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
	 */
	static dot(a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
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
	 * @param {Float32Array} a
	 * @param {Float32Array} b
	 * @param {Float32Array} [dst]
	 */
	static add(a, b, dst = new Float32Array(3)) {
		dst[0] = a[0] + b[0];
		dst[1] = a[1] + b[1];
		dst[2] = a[2] + b[2];

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

	static length(v = new Float32Array(3)) {
		const v0 = v[0];
		const v1 = v[1];
		const v2 = v[2];
		return Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2);
	}

	static setLength(v = new Float32Array(3), l = 1, dst = new Float32Array(3)) {
		this.normalize(v, dst);
		this.multiplyScalar(dst, l, dst);
	}

	static multiplyScalar(
		v = new Float32Array(3),
		k = 1,
		dst = new Float32Array(3),
	) {
		dst[0] = v[0] * k;
		dst[1] = v[1] * k;
		dst[2] = v[2] * k;
		return dst;
	}

	static applyQuaternion(
		v = new Float32Array(3),
		q = new Float32Array(4),
		dst = new Float32Array(3),
	) {
		// quaternion q is assumed to have unit length

		const vx = v[0];
		const vy = v[1];
		const vz = v[2];

		const qx = q[0];
		const qy = q[1];
		const qz = q[2];
		const qw = q[3];

		const tx = 2 * (qy * vz - qz * vy);
		const ty = 2 * (qz * vx - qx * vz);
		const tz = 2 * (qx * vy - qy * vx);

		dst[0] = vx + qw * tx + qy * tz - qz * ty;
		dst[1] = vy + qw * ty + qz * tx - qx * tz;
		dst[2] = vz + qw * tz + qx * ty - qy * tx;

		return dst;
	}

	static applyMatrix4(
		v = new Float32Array(3),
		m = new Float32Array(16),
		dst = new Float32Array(3),
	) {
		const x = v[0];
		const y = v[1];
		const z = v[2];
		const w = 1;
		dst[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
		dst[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
		dst[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
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

export {Vector3Utils};
