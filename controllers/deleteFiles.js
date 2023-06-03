const fs = require( 'fs' );

const deleteFiles = async ( language, filePath ) => {
    if ( !filePath ) {
        return;
    }

    fs.unlink( filePath, ( err ) => {
        if ( err ) {
            console.log( 'Error deleting the file: ', err );
        }
    } );

    if ( language === 'java' ) {
        filePath = filePath.replace( '.java', '.class' );
        fs.unlink( filePath, ( err ) => {
            if ( err ) {
                console.log( 'Error deleting the file: ', err );
            }
        } );
    }

};

module.exports = deleteFiles;