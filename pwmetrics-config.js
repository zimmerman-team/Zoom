module.exports = {
    // url: 'http://localhost:3000/',
    url: 'http://zoomy.datajunk.io/',
    // url: 'http://zoomy.datajunk.io/kenya-workshop',
    flags: {
        runs: 1,
        chromeFlags: '--headless',
        submit: true,
        view: true,
    },
    sheets: {
        type: 'GOOGLE_SHEETS',
        options: {
            spreadsheetId: '11iJzhrdvbgt8jYy3gqGRRYneYT4OVD31G1IE4UQidi8',
            tableName: 'data'
        }
    },
    clientSecret: {
        installed: {
          client_id: "271391415076-jkd9ibv1e31vnf5cvf2sgv3o72ph8jgk.apps.googleusercontent.com",
          project_id: "zoom-1542294895001",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://accounts.google.com/o/oauth2/v3/token",
          auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
          client_secret: "xNThmJkru6ScYJG41CDNqyAr",
          redirect_uris: [
            "urn:ietf:wg:oauth:2.0:oob",
            "http://localhost"
          ]
        }
    }
}
