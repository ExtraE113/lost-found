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


function readFirebase(gettingLost) {
    if (gettingLost) {
        database.ref('items/found').once('value', function (snap) {
            htmlInjector(snap, gettingLost);
        });
    } else {
        database.ref('items/lost').once('value', function (snap) {
            htmlInjector(snap);
        });
    }
}


function htmlInjector(snap, gettingLost) {
    if (snap.numChildren() === 0) {
        if (gettingLost)
            htmlOut = "Sorry, no found items in the system right now.";
        else
            htmlOut = "Sorry, no lost items in the system right now.";
    } else {
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
        var htmlOut = htmlTemplate.repeat(snap.numChildren());
        for (let key in itemObj) {
            let cardData = itemObj[key];
            for (let target in cardData) {
                htmlOut = htmlOut.replace(target + "-js-reserved", cardData[target])
            }
        }
    }
    document.getElementById("content").innerHTML = htmlOut;
}


function writeItemData(imgLink, cardTitle, cardContent, userFoundItem) {
    let randID = Math.random().toString(36).replace(/[^a-z]+/g, '');
    //rather than check if the key is used we just accept the very small odds that it is in use. Simplifies logic.
    let path = "";
    if (userFoundItem)
        path = 'items/found/';
    else
        path = 'items/lost/';
    database.ref(path + randID).set({
        "img-link": imgLink,
        "card-title": cardTitle,
        "card-content": cardContent
    });
}