class ArrayUtils {
	/**
	 * @returns {number[]}
	 * **/
	static extendArray(array = [0], length = 0) {
		return [...array, ...new Array(Math.max(length - array.length, 0)).fill(0)];
	}

	static extendArrayToMultipleOfFour(array = [0]) {
		return this.extendArray(array, Math.ceil(array.length / 4) * 4);
	}
}

export {ArrayUtils};
