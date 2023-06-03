// creates a new file and writes the code to it.

const path = require( 'path' );
const fs = require( 'fs' );

const codesPath = path.join( __dirname, '../codes' );

if ( !fs.existsSync( codesPath ) ) {
    fs.mkdirSync( codesPath, { recursive: true } );
}

const generateFile = async ( language, code ) => {
    let fileName = generateFileName();
    code = code.replace( 'CodeLab', fileName );

    if ( language === 'java' ) {
        fileName += '.java';
    } else if ( language === 'python' ) {
        fileName += '.py';
    }

    const filePath = path.join( codesPath, fileName );
    await fs.writeFileSync( filePath, code );
    return filePath;
};


// function to generate random file names
const generateFileName = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let roomId = '';
    for ( let i = 0; i < 10; i++ ) {
        const randomIndex = Math.floor( Math.random() * letters.length );
        const randomLetter = letters.charAt( randomIndex );
        roomId += randomLetter;
    }
    return roomId;
};


module.exports = generateFile;