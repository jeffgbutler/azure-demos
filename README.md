# azure-demos
Various Demos for Microsoft Azure

## contactlist-backend
Backend JavaScript for the contect list application.  Do not push
this directly into the Azure Git repo, rather you should push just the
items you wish to use.

To match the backend I created, follow these steps:

1. Create an Azure Mobile Service with a JavaScript backend
2. Add a table "Contact" with the following columns added:
   * firstname (string)
   * lastname (string)
   * contact_type (string)
3. Add a table "ContactType" with the following columns added:
   * text (string)
4. Create the following API (then copy the JavaScript from this
   repo into the APIs via Git or the web interface):
   * getcontacts
   * intitialize
5. Push contactlist-backend/service/shared/contactvalidator.js to Azure via Git
6. Move the following table scripts to Azure either through Git or the web interface:
   * contactlist-backend/service/table/contact.insert.js
   * contactlist-backend/service/table/contact.update.js

## contactlist-html
This is a small HTML/JavaScript application that uses the backend.  To use:

1. Add your Azure service URL and key to these files:
   * contactlist-html/admin.js
   * contactlist-html/app.js
2. Run contactlist-html/admin.html and use the button on the screen to initialize the database
3. Run contactlist-html/index.html (the main application)

Note that Azure only accepts requests from "localhost" by default, so you will need to run
these pages through a local web server (IIS, Tomcat, etc.)
