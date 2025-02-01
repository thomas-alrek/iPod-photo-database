import DataChunk, { IDENTIFIER, CHUNK_SIZE } from './DataChunk.js';
import Chunk from './Chunk.js';
import DataObject from './DataObject.js';

const NUM_DATA_OBJECT_CHILDREN = 0x0C;
const NUM_ALBUM_ITEM = 0x10;
const PLAYLIST_ID = 0x14;
const ALBUM_TYPE = 0x1E;
const PLAY_MUSIC = 0x1F;
const REPEAT = 0x20;
const RANDOM = 0x21;
const SHOW_TITLES = 0x22;
const TRANSITION_DIRECTION = 0x23;
const SLIDE_DURATION = 0x24;
const TRANSITION_DURATION = 0x28;
const DB_ID_2 = 0x34;
const PREV_PLAYLIST_ID = 0x3C;

export default class PhotoAlbum extends DataChunk {
    numDataObjectChildren;
    numAlbumItem;
    playlistId;
    albumType;
    playMusic;
    repeat;
    random;
    showTitles;
    transitionDirection;
    slideDuration;
    transitionDuration;
    dbId2;
    prevPlaylistId;
    children = [];

    static get chunkIdentifier() {
        return 'mhba'
    }

    constructor(buffer) {
        super(buffer)

        this.numDataObjectChildren = this.readUint32LE(buffer, NUM_DATA_OBJECT_CHILDREN)
        this.numAlbumItem = this.readUint32LE(buffer, NUM_ALBUM_ITEM)
        this.playlistId = this.readUint32LE(buffer, PLAYLIST_ID)
        this.albumType = this.readUint8(buffer, ALBUM_TYPE)
        this.playMusic = this.readUint8(buffer, PLAY_MUSIC)
        this.repeat = this.readUint8(buffer, REPEAT)
        this.random = this.readUint8(buffer, RANDOM)
        this.showTitles = this.readUint8(buffer, SHOW_TITLES)
        this.transitionDirection = this.readUint8(buffer, TRANSITION_DIRECTION)
        this.slideDuration = this.readUint32LE(buffer, SLIDE_DURATION)
        this.transitionDuration = this.readUint32LE(buffer, TRANSITION_DURATION)
        this.dbId2 = Number(this.readUint64LE(buffer, DB_ID_2).toString(16).padStart(8, '0'))
        this.prevPlaylistId = this.readUint32LE(buffer, PREV_PLAYLIST_ID)

        let chunkBaseAddress = this.headerSize

        for (let i = 0; i < this.numDataObjectChildren; i++) {
            const chunkSize = this.readUint32LE(buffer, chunkBaseAddress + CHUNK_SIZE)
            const chunk = buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)
            const chunkType = this.readString(chunk, IDENTIFIER, 4)

            switch (chunkType) {
                case DataObject.chunkIdentifier:
                    this.children.push(new DataObject(chunk))
                    break
                default:
                    this.children.push(new Chunk(chunk))
                    break
            }

            chunkBaseAddress += chunkSize
        }

        for (let i = 0; i < this.numAlbumItem; i++) {
            const chunkSize = this.readUint32LE(buffer, chunkBaseAddress + CHUNK_SIZE)
            const chunk = buffer.slice(chunkBaseAddress, chunkBaseAddress + chunkSize)
            const chunkType = this.readString(chunk, IDENTIFIER, 4)

            switch (chunkType) {
                default:
                    this.children.push(new Chunk(chunk))
                    break
            }

            chunkBaseAddress += chunkSize
        }
    }

    get name() {
        return this.children[0].content
    }
}