/*
 * Copyright 2022 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const vector3 = {
	cross(a, b, dst) {
		dst = dst || new Float32Array(3);

		const t0 = a[1] * b[2] - a[2] * b[1];
		const t1 = a[2] * b[0] - a[0] * b[2];
		const t2 = a[0] * b[1] - a[1] * b[0];

		dst[0] = t0;
		dst[1] = t1;
		dst[2] = t2;

		return dst;
	},

	subtract(a, b, dst) {
		dst = dst || new Float32Array(3);

		dst[0] = a[0] - b[0];
		dst[1] = a[1] - b[1];
		dst[2] = a[2] - b[2];

		return dst;
	},

	normalize(v, dst) {
		dst = dst || new Float32Array(3);

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
	},
	computeNormal(a, b, c, dst) {
		dst = dst || new Float32Array(3);
		const first = this.subtract(b, a);
		const second = this.subtract(c, a);
		const cross = this.cross(first, second);
		return this.normalize(cross, dst);
	},
};

/**
 * @property {number} x
 * @property {number} y
 * @property {number} z
 **/
class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		this.set(x, y, z);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	set(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	normalize() {
		const result = [this.x, this.y, this.z];
		vector3.normalize([this.x, this.y, this.z], result);
		this.set(...result);
	}
}

export {vector3, Vector3};
