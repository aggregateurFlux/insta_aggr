#Start server
Get dependency form the package.json :

npm install

Start :

node sever.js

See result :

http://localhost:8000

# Execute test
npm test

#Documentation
Pour avoir le file d'actualité d'un utilisateur :

* En GET
* http://localhost:8000/user/feed
* parametre : access_token instagram de l'utilisateur dans l'entete de la requete
* Résultat : en JSON :
*  {
* "idAuthor": "4250417618",
* "authorName": "sylvain",
* "postCreatedAt": "1481469147",
* "imageLink": "https://www.instagram.com/p/BN4aY_zjTYv/",
* "content": ""
* },

Pour avoir le scope attendu par cette api :

* En GET
* http://localhost:8000/scope
* pas de parametre attendu

Pour poster un message 

* En POST
* http://localhost:8000/media/{mediaId}/addComment
* paramètre : 
* mediaId --> l'id du media (message) que l'on veut commenter
* access_token --> access_token instgram de l'utilisateur
* content --> message que l'on veut écrire