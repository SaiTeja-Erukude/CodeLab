const runBtn = document.getElementById( 'run-button' );
const codeEditor = document.getElementById( 'code-editor' );
const languageSelector = document.getElementById( 'language-select' );
const output = document.getElementById( 'output' );
const hostURL = window.location.href;


// retrieve saved data from session storage
if ( sessionStorage.getItem( 'language' ) ) {
    languageSelector.value = sessionStorage.getItem( 'language' );
}
if ( sessionStorage.getItem( 'code' ) ) {
    codeEditor.value = sessionStorage.getItem( 'code' );
}
if ( sessionStorage.getItem( 'output' ) ) {
    output.textContent = sessionStorage.getItem( 'output' );
}


runBtn.addEventListener( 'click', async () => {
    if ( codeEditor.value === '' ) {
        return;
    }
    const language = languageSelector.value;
    const code = codeEditor.value;
    sessionStorage.setItem( 'code', codeEditor.value );
    sessionStorage.setItem( 'language', languageSelector.value );

    const response = await fetch( hostURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { language, code } )
    } );

    const resData = await response.json();
    output.textContent = resData.result;
    sessionStorage.setItem( 'output', output.textContent );
} );


// boiler plate code for java
languageSelector.addEventListener( 'change', function () {
    if ( this.value === 'java' ) {
        codeEditor.value = 'class CodeLab {\n\t public static void main( String[] args ) {\n\t\tSystem.out.println( "Hello World!" );  \n\t} \n}';
    }
    sessionStorage.setItem( 'language', this.value );
} );


codeEditor.addEventListener( 'change', function () {
    sessionStorage.setItem( 'code', this.value );
} );


// handles tab functionality within the code editor
codeEditor.addEventListener( "keydown", function ( e ) {
    if ( e.key === "Tab" ) {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert tab character
        this.value = this.value.substring( 0, start ) + "\t" + this.value.substring( end );

        // Adjust the selection position
        this.selectionStart = this.selectionEnd = start + 1;
    }
} );