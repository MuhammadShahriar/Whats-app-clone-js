
document.getElementById('root').addEventListener("DOMSubtreeModified", async () => {
    const chat = await document.querySelector( '.chat' );
    if ( !chat ) return;
    // console.log(chat.innerHTML.length);
    if ( chat.innerHTML.length > 0 ) return;


    const xhr__chat = new XMLHttpRequest();

    xhr__chat.onload = function () {
        if (this.status === 200 ) {
            chat.innerHTML = xhr__chat.responseText;
        } else {
            console.log("Did not works");
        }
    }

    xhr__chat.open('get', 'src/view/Chat.html' );
    xhr__chat.send();
});

document.getElementById('root').addEventListener("DOMSubtreeModified", async () => {
    const chat = await document.querySelector( '.chat' );
    if ( !chat ) return;

    var form = document.querySelector('.chat__footer--form');
    if(!form) return
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        var message = document.getElementById('message').value;
        if(!message) return;
        
        db.collection('friendShips')
        .doc(friendShip.id)
        .collection('messages')
        .add({
            message: message,
            receiver: receiver.email,
            sender: auth.currentUser.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        document.getElementById('message').value = ''// console.log(e);


    })

});


