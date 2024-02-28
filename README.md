Server =>

Basic design of the database =>

    we will be storing the information of each tooth of every person.

    The information will contain the image, date of appointments, details about the tooth, remarks about the tooth and other information needed for searching  etc.



config.env => the environment variable of the database are defined

mongoConnection.js  => 
    an object db is created to which the environment variable to connect to the database are passed ( defined in config.env)

    mongoose module is imported 

    An async function try to connect to mongoose database

MODEL =>
    xray.js
        this defines the template of the document
        (under the current status if will just be url and details which are string and objects repectively)

UTILS =>
    index.js
        this has modules for email validation and password encryption

        currently retundant for us

    upload.js 
        it contains a promise which uploads the file into the middleware's memory 
     
Controller =>
    xray_controller.js =>
        the modules defined in MODEL and UTILS are imported 
        an instance of the google bucket storage is created and bucket assigned to us ("cvteam") is stored in bucket variable

        then a blob space in bucket to store the image is created and a stream to write it is initialised

        a public url to the space is created 

        a document is made in accordance to the database design and uploaded




        

