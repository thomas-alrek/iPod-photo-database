import DataChunk, { IDENTIFIER, CHUNK_SIZE } from './DataChunk.js';
import DataSet from './DataSet.js';

export const NUM_CHILDREN = 0x14
export const NEXT_ID_FOR_MHII = 0x1C

export default class DataFileObject extends DataChunk {
    numChildren;
    nextIdForMHII;
    children = [];

    static get chunkIdentifier() {
        return 'mhfd';
    }

    /**
     * @param Uint8Array buffer 
     */
    constructor(buffer) {
        super(buffer)

        this.numChildren = this.readUint32LE(buffer, NUM_CHILDREN)
        this.nextIdForMHII = this.readUint32LE(buffer, NEXT_ID_FOR_MHII)

        let chunkBaseAddress = this.headerSize

        for (let i = 0; i < this.numChildren; i++) {
            const chunkSize = this.readUint32LE(buffer, chunkBaseAddress + CHUNK_SIZE)
            const chunk = buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)
            const chunkType = this.readString(chunk, IDENTIFIER, 4)

            switch (chunkType) {
                case DataSet.chunkIdentifier:
                    this.children.push(new DataSet(chunk))
                    break
                default:
                    this.children.push(new Chunk(chunk))
                    break
            }

            chunkBaseAddress += chunkSize
        }
    }
}