const fs = require('fs');
const fsP = require('fs').promises;
const { pipeline } = require('stream/promises');
const path = require('path');

const samplePath = path.join(__dirname, 'sample.txt');
const copyPath = path.join(__dirname, 'sample-copy.txt');

// Initialize file asynchronously using fsP
async function initFile() {
    try {
        await fsP.access(samplePath);
    } catch {
        await fsP.writeFile(samplePath, `Hwawawaw wawawawawa awawawawawawawaw`, 'utf8');
    }
}

// --- Task 1: Stream Events Model ---
function logStreamEvents() {
    return new Promise((resolve, reject) => {
        const readableStream = fs.createReadStream(samplePath, {
            encoding: 'utf8'
        });

        readableStream.on('open', () => {
            console.log(`[Task 1] File successfully opened.`);
        });

        readableStream.on('data', (chunk) => {
            console.log(`[Task 1] Received data chunk: ${chunk}`);
        });

        readableStream.on('end', () => {
            console.log(`[Task 1] File reading completed.`);
            resolve();
        });

        readableStream.on('error', reject);
    });
}

// --- Task 2: Buffer Management ---
function countChunksWithBuffer() {
    return new Promise((resolve, reject) => {
        const readableStream = fs.createReadStream(samplePath, {
            highWaterMark: 512,
            encoding: 'utf8'
        });

        let chunkCount = 0;

        readableStream.on('data', () => {
            chunkCount++;
        });

        readableStream.on('end', () => {
            console.log(`[Task 2] Total chunks: ${chunkCount}`);
            resolve();
        });

        readableStream.on('error', reject);
    });
}

// --- Task 3: Data Search & Flow Control ---
function searchWordInStream(targetWord) {
    return new Promise((resolve, reject) => {
        if (!targetWord) {
            reject(new Error(`Search word cannot be empty.`));
            return;
        }

        const readableStream = fs.createReadStream(samplePath, {
            encoding: 'utf8',
            highWaterMark: 512
        });

        let previousText = '';
        let totalCharsProcessed = 0;
        let pauseScheduled = false;

        readableStream.on('data', (chunk) => {
            const combinedText = previousText + chunk;
            const chunkStartPos = totalCharsProcessed;
            let index = combinedText.indexOf(targetWord);

            while (index !== -1) {
                const absoluteIndex = chunkStartPos - previousText.length + index;

                if (absoluteIndex + targetWord.length > chunkStartPos) {
                    console.log(`[Task 3] Word "${targetWord}" found at index ${absoluteIndex}.`);

                    if (!pauseScheduled) {
                        pauseScheduled = true;
                        console.log(`[Task 3] Pausing stream for 3 seconds...`);

                        readableStream.pause();

                        setTimeout(() => {
                            console.log(`[Task 3] Resuming stream.`);
                            readableStream.resume();
                        }, 3000);
                    }
                }

                index = combinedText.indexOf(targetWord, index + 1);
            }

            totalCharsProcessed += chunk.length;
            previousText = combinedText.slice(-(targetWord.length - 1));
        });

        readableStream.on('end', resolve);
        readableStream.on('error', reject);
    });
}

// --- Task 4: Append-Mode Writing ---
function appendDataToFile() {
    return new Promise((resolve, reject) => {
        const dateTime = new Date().toISOString();
        const linesToAppend =
            `\n[Log Time: ${dateTime}]\n` +
            `Line 1: Important event\n` +
            `Line 2: Status check\n` +
            `Line 3: Operation complete\n`;

        const writableStream = fs.createWriteStream(samplePath, {
            flags: 'a',
            encoding: 'utf8'
        });

        writableStream.on('finish', () => {
            console.log(`[Task 4] Data successfully appended. Old data preserved.`);
            resolve();
        });

        writableStream.on('error', reject);
        writableStream.end(linesToAppend);
    });
}

// --- Task 5: Pipeline / File Copying ---
async function copyFileWithPipe() {
    await pipeline(
        fs.createReadStream(samplePath),
        fs.createWriteStream(copyPath)
    );
    console.log(`Готово`);
}

// Execute tasks sequentially
async function main() {
    try {
        await initFile();
        await logStreamEvents();
        await countChunksWithBuffer();
        await searchWordInStream(`wawaw`);
        await appendDataToFile();
        await copyFileWithPipe();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}

main();