import {Matrix4Utils} from './Matrix4Utils.js';

class Matrix4 {
	constructor(elements = Matrix4Utils.identity()) {
		Object.defineProperties(this, {
			elements: {
				value: elements,
			},
		});
	}
}

export {Matrix4};
