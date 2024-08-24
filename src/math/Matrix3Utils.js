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

class Matrix3Utils {
	// TODO: need to understand why is this 12 but not 9
	// prettier-ignore
	static identity(dst = new Float32Array(12)) {
		dst[ 0] = 1;  dst[ 1] = 0;  dst[ 2] = 0;
		dst[ 4] = 0;  dst[ 5] = 1;  dst[ 6] = 0;
		dst[ 8] = 0;  dst[ 9] = 0;  dst[10] = 1;

		return dst;
	}

	/**
	 *
	 * @param {Float32Array} m
	 * @param {Float32Array} [dst]
	 * @returns {Float32Array}
	 */
	// prettier-ignore
	static 	fromMat4(m, dst = new Float32Array(12)) {
		dst[0] = m[0]; dst[1] = m[1];  dst[ 2] = m[ 2];
		dst[4] = m[4]; dst[5] = m[5];  dst[ 6] = m[ 6];
		dst[8] = m[8]; dst[9] = m[9];  dst[10] = m[10];

		return dst;
	}
}

export {Matrix3Utils};
