

var root = document.querySelector( '.root' );

auth.onAuthStateChanged ((authUser) => {
    if ( authUser ) {
    
        const xhr__app = new XMLHttpRequest();
        xhr__app.onload = function () {
            if (this.status === 200 ) {
                root.innerHTML = xhr__app.responseText;
            } else {
                console.log("Did not works");
            }
        }
    
        xhr__app.open('get', 'src/view/App.html' );
        xhr__app.send();
    }
    
    else {
        console.log('ok')
        const xhr__login = new XMLHttpRequest();
        xhr__login.onload = function () {
            if (this.status === 200 ) {
                root.innerHTML = xhr__login.responseText;
            } else {
                console.log("Did not works");
            }
        }
    
        xhr__login.open('get', 'src/view/Login.html' );
        xhr__login.send();
    }
})




