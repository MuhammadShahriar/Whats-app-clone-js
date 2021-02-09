
document.getElementById('root').addEventListener("DOMSubtreeModified", async () => {

    const sidebar = await document.querySelector('.sidebar');
    if ( !sidebar ) return;
    if ( sidebar.innerHTML.length > 0 ) return;

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (this.status === 200 ) {
            sidebar.innerHTML = xhr.responseText;
        } else {
            console.log("Did not works");
        }
    }

    xhr.open('get', 'src/view/Sidebar.html' );
    xhr.send();

});

document.getElementById('root').addEventListener("DOMSubtreeModified", async () => {

    const sidebar = await document.querySelector('.sidebar');
    if ( !sidebar ) return;
    const profilePic = document.getElementById('profilePic');
    if ( !profilePic ) return;
    if ( profilePic.src === auth.currentUser.photoURL ) return;
    document.getElementById('profilePic').src = auth.currentUser.photoURL;
});

const addUser = (name, email, photoUrl, friendShipId ) => {
    db.collection('users')
    .doc(currentUser.id)
    .collection('friends')
    .add({
        email: email,
        name: name,
        photoUrl: photoUrl,
        friendShipId : friendShipId
    })
    .then((docRef) => {
        Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: `You and ${email} are now friends`
        });
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


const addNewChat = () => {
    const email = prompt("Enter email address: ");
    var name, photoUrl;
    if ( !email ) return;
    
    var done = false;

    if ( email === currentUser.email ) {
        Swal.fire({
            icon: 'info',
            title: 'Hey',
            text: `${email} is your email id`
        });

        return;
    }

    db.collection('users')
    .where('email', '==', email)
    .get()
    .then((snapshot) => {
        if ( snapshot.docs.length === 0 ) {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: `${email} does not exits`
            })

            done = true;
        }
        else {
            name = snapshot.docs[0].data().displayName;
            photoUrl = snapshot.docs[0].data().photoURL;
        }
    })

    if ( !done ) {
        var emailList = [currentUser.email, email];
        emailList.sort();
        var friendShip = emailList[0] + emailList[1];
        var friendShipId = '';


        db.collection('users')
        .doc(currentUser.id)
        .collection('friends')
        .where('email', '==', email)
        .get()
        .then((snapshot) => {
            if ( snapshot.docs.length === 0 ) {
                db.collection("friendShips")
                .where('friendShip', '==', friendShip)
                .get()
                .then((snapshot) => {
                    if ( snapshot.docs.length === 0 ) {
                        
                        db.collection("friendShips").add({
                            friendShip: friendShip,
                        })
                        .then((docRef) => {            
                            addUser (name, email, photoUrl, docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                    }
                    else {
                        addUser (name, email, photoUrl, snapshot.docs[0].id);
                    }
                });

                
            }
            else {
                Swal.fire({
                    icon: 'info',
                    title: 'Hey',
                    text: `You and ${email} are already friends`
                })
            }
        })

    }

}

const logout = () => {
    auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}