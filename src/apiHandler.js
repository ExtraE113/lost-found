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


function readFirebase() {
    var jsonString;
    database.ref('items/found').once('value', function (snap) {
        firebaseIteratorTester(snap);
    });
}


function firebaseIteratorTester(snap) {
    let itemObj = snap.val();
    let htmlTemplate = /*region HTMLCard*/ '<div class="col s12 m4">\n' +
        '            <div class="card medium">\n' +
        '                <div class="card-image">\n' +
        '                    <img src="img-link-js-reserved">\n' +
        '                    <span class="card-title">card-title-js-reserved</span>\n' +
        '                </div>\n' +
        '                <div class="card-content">\n' +
        '                    <p>card-content-js-reserved</p>\n' +
        '                </div>\n' +
        '                <div class="card-action">\n' +
        '                    <a href="#">View Comments</a>\n' +
        '                    <a href="#">Report</a>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>'/*endregion*/;
    let htmlOut = htmlTemplate.repeat(snap.numChildren());
    for (let key in itemObj) {
        let cardData = itemObj[key];
        for (let target in cardData) {
            htmlOut = htmlOut.replace(target + "-js-reserved", cardData[target])
        }
    }
    document.getElementById("content").innerHTML = htmlOut;
}


function writeItemData(imgLink, cardTitle, cardContent) {
    let randID = Math.random().toString(36).replace(/[^a-z]+/g, '');
    while (checkIfKeyUsed(randID)){
        randID = Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
    database.ref('items/found/' + randID).set({
        "img-link": imgLink,
        "card-title": cardTitle,
        "card-content": cardContent
    });
}
//returns true if key is in use
function checkIfKeyUsed(key) {
    database.ref('items/found/' + key).once('value', function (snap) {
        return (snap.val() == null);
    });
}