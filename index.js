let AWS = require('aws-sdk')

let s3 = new AWS.S3()
exports.handler = async (event, context, callback) => {
    const prefix_path = process.env.PREFIX_PATH ? process.env.PREFIX_PATH : ''
    const destBucket = process.env.DEST_BUCKET

    const srcBucket = event.Records[0].s3.bucket.name

    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    console.log(`Lambda triggered on object upload: ${srcKey}`)

    const destKey = `${prefix_path}/${srcKey}`
    console.log(`Copying object to bucket: ${destBucket} with key: ${destKey}`)

    try {
        const destinationParams = {
            Bucket: destBucket,
            Key: destKey,
            CopySource: encodeURIComponent(srcBucket + '/' + srcKey),
            MetadataDirective: 'COPY'
        }
        await s3.copyObject(destinationParams).promise();
    } catch (err) {
        console.log(`Failed to copy asset to production bucket. Error: ${err}`)
    }
    console.log(`Successfully copied ${srcBucket}/${srcKey} ----> ${destBucket}/${destKey}`)
}