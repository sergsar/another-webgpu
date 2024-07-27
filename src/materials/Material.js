import {generateUUID} from '../utils/generateUUID.js';
import {Color} from '../math/Color.js';

class Material {
	constructor() {
		this.id = generateUUID();
		this.color = new Color(Math.random(), Math.random(), Math.random(), 1);
		this.needsUpdate = true;
	}
}

export {Material};
