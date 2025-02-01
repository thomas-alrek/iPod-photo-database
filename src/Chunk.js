import HeaderIdentifierMismatch from './errors/HeaderIdentifierMismatch.js';
import InvalidHeader from './errors/InvalidHeader.js';

export const IDENTIFIER = 0x0;
export const HEADER_SIZE = 0x4;

export default class Chunk {
    /**
     * @type {string}
     */
    identifier;

    /**
     * @type {number}
     */
    headerSize;

    /**
     * @param Uint8Array buffer 
     */
    constructor(buffer, verifyIdentifier = true) {
        this.identifier = this.readString(buffer, IDENTIFIER, 4)

        const chunkIdentifier = this.constructor.chunkIdentifier || this.identifier

        if (verifyIdentifier && this.identifier !== chunkIdentifier) {
            throw new HeaderIdentifierMismatch(this.constructor.chunkIdentifier, this.identifier)
        }

        this.headerSize = this.readUint32LE(buffer, HEADER_SIZE)
    }

    assertLength(buffer, offset, length) {
        if (buffer.length < offset + length) {
            throw new InvalidHeader(offset, length)
        }
    }

    readUint8(buffer, offset) {
        this.assertLength(buffer, offset, 1)
        try {
            return new DataView(buffer.buffer).getUint8(offset)
        } catch (e) {
            debugger
        }
    }

    readInt8(buffer, offset) {
        this.assertLength(buffer, offset, 1)
        return buffer[offset]
    }

    readUint16LE(buffer, offset) {
        this.assertLength(buffer, offset, 2)
        return new DataView(buffer.buffer).getUint16(offset, true)
    }

    readUint16BE(buffer, offset) {
        this.assertLength(buffer, offset, 2)
        return new DataView(buffer.buffer).getUint16(offset, false)
    }

    readInt16LE(buffer, offset) {
        this.assertLength(buffer, offset, 2)
        return new DataView(buffer.buffer).getInt16(offset, true)
    }

    readInt16BE(buffer, offset) {
        this.assertLength(buffer, offset, 2)
        return new DataView(buffer.buffer).getInt16(offset, false)
    }

    readUint32LE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getUint32(offset, true)
    }

    readUint32BE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getUint32(offset, false)
    }

    readInt32LE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getInt32(offset, true)
    }

    readInt32BE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getInt32(offset, false)
    }

    readFloat32LE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getFloat32(offset, true)
    }

    readFloat32BE(buffer, offset) {
        this.assertLength(buffer, offset, 4)
        return new DataView(buffer.buffer).getFloat32(offset, false)
    }

    readUint64LE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getBigUint64(offset, true)
    }

    readUint64BE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getBigUint64(offset, false)
    }

    readInt64LE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getBigInt64(offset, true)
    }

    readInt64BE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getBigInt64(offset, false)
    }

    readFloat64LE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getFloat64(offset, true)
    }

    readFloat64BE(buffer, offset) {
        this.assertLength(buffer, offset, 8)
        return new DataView(buffer.buffer).getFloat64(offset, false)
    }

    readString(buffer, offset, length) {
        this.assertLength(buffer, offset, length)
        return String.fromCharCode(...buffer.slice(offset, offset + length))
    }

    readUtf8String(buffer, offset, length) {
        this.assertLength(buffer, offset, length)
        return new TextDecoder().decode(buffer.slice(offset, offset + length))
    }
}