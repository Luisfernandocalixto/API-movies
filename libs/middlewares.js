import bodyParser from 'body-parser';
module.exports = app => {

    app.set('json spaces', 4);
    app.set('port', process.env.PORT);

    app.use(bodyParser.json());
    app.disable("x-powered-by") 
    // app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

}

