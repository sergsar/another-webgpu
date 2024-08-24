import {Matrix3Utils} from './Matrix3Utils.js';

class Matrix3 {
	constructor() {
		Object.defineProperties(this, {
			elements: {
				value: Matrix3Utils.identity(),
			},
		});
	}
}

export {Matrix3};
