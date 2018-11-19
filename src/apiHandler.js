const config = {
    apiKey: "AIzaSyAt9rOFjgf2zkhKllDZHLkjG81aZu42ioY",
    authDomain: "lost-found-222603.firebaseapp.com",
    databaseURL: "https://lost-found-222603.firebaseio.com",
    projectId: "lost-found-222603",
    storageBucket: "lost-found-222603.appspot.com",
    messagingSenderId: "707419831050"
};
firebase.initializeApp(config);

var database = firebase.database();

function getNumber() {
    return firebase.database().ref('items/found/').limitToLast(1).once('value').then(function(snapshot) {
        return Object.keys(snapshot.val())[0];
    });
}

function logArg(fromResolve) {
    console.log(fromResolve);
}

function writeItemData(imgLink, cardTitle, cardContent) {
    database.ref('items/found/2').set({
        "img-link": imgLink,
        "card-title": cardTitle,
        "card-content" : cardContent
    });
}