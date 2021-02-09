const login = () => {
    auth.signInWithRedirect(googleAuth).catch((error) => alert(error.message));
}

auth.onAuthStateChanged((authUser) => {
    if (authUser) {
        db.collection("users").where("email", "==", authUser.email)
        .get()
        .then((querySnapshot) => {
            if ( querySnapshot.docs.length === 0 ) {
                db.collection('users').add({
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                });
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        db.collection('users').where("email", '==', authUser.email)
        .get()
        .then((querySnapshot) => {
            currentUser.email = authUser.email;
            currentUser.name = authUser.displayName;
            currentUser.photoUrl = authUser.photoURL;
            currentUser.id = querySnapshot.docs[0].id;
            // console.log(db.collection('user')
            //     .doc(currentUser.id)
            //     .collection('friends')
                
            // )

            db.collection('users')
            .doc(currentUser.id)
            .collection('friends')
            .onSnapshot((snapshot) => {
                const roomList = document.querySelector('.sidebar__roomlist');
                roomList.innerHTML = "";
                snapshot.docs.forEach(doc => {
                    // console.log(doc)
                    roomList.insertAdjacentHTML('beforeend', `
                        <div onclick = "initReceiver('${doc.data().friendShipId}', '${doc.data().name}', '${doc.data().email}', '${doc.data().photoUrl}')" class="sidebar__room">
                            <div class="sidebar__room--avatar">
                                <img 
                                    src = '${doc.data().photoUrl}' 
                                    alt="https://image.similarpng.com/very-thumbnail/2020/05/WhatsApp-icon-PNG.png" 
                                    class="avatar"
                                >
                            </div>

                            <div class="sidebar__room--info">
                                <p>${doc.data().name}</p>
                                <span>${doc.data().email}</span>
                            </div>
                        </div>
                    `);
                })
            });
        })


        
    }
  })
