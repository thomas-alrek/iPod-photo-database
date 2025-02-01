import DataFileObject from './DataFileObject.js';

export default class PhotoDB {
    /**
     * @type {DataFileObject}
     * @private
     */
    dataFileObject

    /**
     * @param Uint8Array buffer 
     */
    constructor(buffer) {
        this.dataFileObject = new DataFileObject(buffer)
    }
}