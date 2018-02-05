if(process.env.NODE_ENV === 'production'){
    module.exports = {
         mongoURI :  'mongodb://rasika:rasika@ds225308.mlab.com:25308/rasikag-video-share-app'
    }
} else {
    module.exports = {
        mongoURI : 'mongodb://localhost/vid-upload-app'
    }
}