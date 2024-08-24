/**
 * @property {number} r
 * @property {number} g
 * @property {number} b
 * @property {number} a
 **/
class Color {
	constructor(r, g, b, a) {
		this.set(r, g, b, a);
	}

	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 */
	set(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
}

export {Color}
