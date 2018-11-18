#Lost and Found service for Athenian
##What is this and why do I care?
I get a lot of emails at school about lost and found things that I haven't lost or found. I wanted to get fewer.

##How is the code structured?
Data is stored on [Imgur](https://apidocs.imgur.com/) and [Firebase](firebase.google.com).
Firebase stores a JSON object that contains data to edit replace HTML content with. For example, the key-value might be ```"card-title" : "An item that was lost."```
This would replace the first string in the HTML that matches ```card-title-js-reserved```.

##Is this secure?
Probably not. If you find a problem please submit an issue.