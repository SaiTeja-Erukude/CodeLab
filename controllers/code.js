const deleteFiles = require( "./deleteFiles" );
const executeCode = require( "./executeCode" );
const generateFile = require( "./generateFile" );

const compileAndRunCode = async ( req, res ) => {
    const { language, code } = req.body;
    let filePath = '';
    try {
        filePath = await generateFile( language, code );
        const result = await executeCode( language, filePath );
        deleteFiles( language, filePath );
        return res.status( 200 ).json( { result } );
    } catch ( err ) {
        deleteFiles( language, filePath );
        err = err[ 'stderr' ];
        return res.status( 500 ).json( { result: err } );
    }
};


module.exports = { compileAndRunCode };