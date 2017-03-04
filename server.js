var LIBS = {
        express:    require('express'),
        http:       require('http'),
        path:       require('path'),
    },
    PORT = 8000;

function main() {
    var app,
        server;

    require('marko/node-require').install();
    require('lasso').configure({
        plugins: [
            'lasso-marko'
        ],
        bundlingEnabled:        true,
        fingerprintsEnabled:    true,
        minify:                 false,
    });

    app = LIBS.express();
    app.use(require('lasso/middleware').serveStatic());
    app.get('/', require('./components/page-meter/server.js'));
    server = LIBS.http.createServer(app);
    server.listen(PORT, () => {
        console.log('[SERVER] listening on port', PORT);
    });
}
main();
