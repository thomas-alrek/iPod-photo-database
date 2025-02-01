import DataChunk, { IDENTIFIER, CHUNK_SIZE } from './DataChunk.js';

export const TYPE = 0x0C;
export const PADDING_LENGTH = 0x0F;

export const ALBUM_NAME = 0x01;
export const THUMBNAIL_IMAGE = 0x02;
export const FILE_NAME = 0x03;
export const FULL_RESOLUTION_IMAGE = 0x05;

export const STRING = 0x0C;

export default class DataObject extends DataChunk {
    type;
    paddingLength;
    content;

    static get chunkIdentifier() {
        return 'mhod';
    }

    constructor(buffer) {
        super(buffer);

        this.type = this.readUint16LE(buffer, TYPE);
        this.paddingLength = this.readUint8(buffer, PADDING_LENGTH);
        this.content = this.readUtf8String(buffer, this.headerSize + STRING, this.readUint16LE(buffer, this.headerSize));

        switch (this.type) {
            case THUMBNAIL_IMAGE:
            case FULL_RESOLUTION_IMAGE:
                /* this.content = this.readUtf8String(buffer, this.headerSize + STRING, this.readUint16LE(buffer, this.headerSize)); */
                /* console.log({
                    headerSize: this.headerSize,
                    chunkSize: this.chunkSize,
                    type: this.type,
                })

                console.log(this.chunkSize, this.headerSize - 4, this.chunkSize - this.headerSize - 4)
                const chunk = buffer.slice(this.headerSize - 4, this.chunkSize - this.headerSize - 4);

                console.log(buffer)

                console.log(new ImageName(chunk, false))

                console.log(this.readString(buffer, 0, this.chunkSize));
                /* const chunkSize = this.readUint32LE(buffer, this.headerSize + CHUNK_SIZE)
                const chunk = buffer.slice(this.headerSize, this.chunkSize - chunkSize)
                const chunkType = this.readString(chunk, IDENTIFIER, 4) */

                debugger;

                break;
        }
    }
}