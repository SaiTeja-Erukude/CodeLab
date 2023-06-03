const express = require( 'express' );
const app = express();

require( 'dotenv' ).config();
const PORT = process.env.PORT || 5000;

app.use( express.static( 'public' ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

const codeRouter = require( './routes/code' );
app.use( '/', codeRouter );

app.listen( PORT, () => {
    console.log( `Listening at PORT: ${ PORT }` );
} );