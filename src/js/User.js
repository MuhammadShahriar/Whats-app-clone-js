var receiver = {
    name : "",
    photoUrl: "",
    email: "",
}

var currentUser = {
    name: "",
    email: "",
    photoUrl: "",
    id: "",
}

var friendShip = {
    id: "",
    name: "",
}

window.initReceiver = (id, name, email, photoUrl) => {
    document.querySelector('.sidebar').classList.add('hide');
    document.querySelector('.chat').classList.remove('hide');
    receiver.name = name;
    receiver.photoUrl = photoUrl;
    receiver.email = email;
    var emails = [email, auth.currentUser.email];
    emails.sort();
    friendShip.name = emails[0] + emails[1];
    friendShip.id = id;

    document.getElementById('form1').disabled = false;
    document.getElementById('form2').disabled = false;

    document.getElementById('receiver__photo').src = photoUrl;
    document.getElementById('receiver__name').innerHTML = name;

    
    db.collection("friendShips")
    .doc(friendShip.id)
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot((querySnapshot) => {
        const chat__body = document.querySelector('.chat__body');
        chat__body.innerHTML = '';
        
    
        querySnapshot.forEach((doc) => {
            var classname = "chat__message";
            const hours = new Date(doc.data().timestamp?.toDate()).getHours();
            const minuites = new Date(doc.data().timestamp?.toDate()).getMinutes();
            if ( doc.data().sender === auth.currentUser.email ) classname += " chat__user"
            chat__body.insertAdjacentHTML('beforeend', `
                <div class="${classname}">
                    <p>${doc.data().message} </p>
                    <span>${hours}:${minuites}</span>
                </div>
            `);
        });

        
        chat__body.scrollTop = chat__body.scrollHeight;
    })


}

