import PhotoDB from './src/PhotoDB.js';

const main = async () => {
    const response = await fetch('/data/Photo Database')
    const data = await response.arrayBuffer()
    const buffer = new Uint8Array(data)

    const photoDB = new PhotoDB(buffer)

    document.getElementById('output').innerText = JSON.stringify(photoDB, null, 2)
}

main()