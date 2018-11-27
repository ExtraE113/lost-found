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
            '                    <a href="report-link-constant">Report</a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>'/*endregion*/;
        var htmlOut = htmlTemplate.repeat(snap.numChildren());
        for (let key in itemObj) {
            let cardData = itemObj[key];
            for (let target in cardData) {
                htmlOut = htmlOut.replace(target + "-js-reserved", cardData[target])
            }
            //hmlOut = htmlOut.replace("report-link-constant", cardData[])
        }
    }
    document.getElementById("content").innerHTML = htmlOut;
}


function writeItemData(imgLinkPromise, cardTitle, cardContent, userFoundItem) {
    document.getElementById('loading').className = "center-align";
    document.getElementById('loading').innerHTML = /*region loading*/"<div class=\"center-align\">\n" +
        "                <div class=\"preloader-wrapper big active\">\n" +
        "                    <div class=\"spinner-layer spinner-red-only\">\n" +
        "                        <div class=\"circle-clipper left\">\n" +
        "                            <div class=\"circle\"></div>\n" +
        "                        </div>\n" +
        "                        <div class=\"gap-patch\">\n" +
        "                            <div class=\"circle\"></div>\n" +
        "                        </div>\n" +
        "                        <div class=\"circle-clipper right\">\n" +
        "                            <div class=\"circle\"></div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>"/*endregion*/;
    let path = "";
    if (userFoundItem)
        path = 'items/found/';
    else
        path = 'items/lost/';
    imgLinkPromise.then(function (link) {
        var a = link.split("/");
        console.log(a);
        database.ref(path + a.pop().split(".")[0]).set({
            "img-link":link,
            "card-title": cardTitle,
            "card-content": cardContent
        });
        document.getElementById('loading').innerHTML = "<h4>Submission sucess!</h4>";
    });
}

//Imgur api


function upload(file) {
    return new Promise(function (resolve, reject) {
        if (!file || !file.type.match(/image.*/)) reject("file uploaded was not an image");
        var fd = new FormData();
        fd.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://api.imgur.com/3/image"); // Boooom!
        xhr.setRequestHeader("Authorization", "Client-ID 6fb6d927f7fe0db");
        xhr.onload = function () {
            let reply = JSON.parse(xhr.response);
            if (reply.success) {
                console.log("here");
                resolve(reply.data.link);
            }
            else
                reject(reply)

        };
        xhr.send(fd);
    });
}