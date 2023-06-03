const path = require( 'path' );
const { exec } = require( 'child_process' );

const codesPath = path.join( __dirname, '../codes' );


const executeCode = ( language, filePath ) => {
    const fileName = path.basename( filePath ).split( '.' )[ 0 ];

    let command = '';

    if ( language === 'java' ) {
        command = `javac ${ filePath } && cd ${ codesPath } && java ${ fileName }`;
    } else if ( language === 'python' ) {
        command = `python ${ filePath }`;
    }

    return new Promise( ( resolve, reject ) => {
        exec( command, ( error, stdout, stderr ) => {
            error && reject( { error, stderr } );
            stderr && reject( stderr );
            resolve( stdout.trim() );
        } );
    } );

};

module.exports = executeCode;