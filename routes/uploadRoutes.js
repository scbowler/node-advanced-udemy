const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey, bucket } = require('../config/keys');

const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {

        console.log('PARAMS:', req.query.fileType);

        const key = `${req.user.id}/${uuid()}.jpeg`;


        s3.getSignedUrl('putObject', {
            Bucket: bucket,
            ContentType: req.query.fileType,
            Key: key
        }, (err, url) => res.send({key, url}) );
    });
};
