const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true})
const Busboy = require('busboy')
const fs = require('fs')

const gcConfig = {
  projectId: 'sage-courier-161212',
  keyFilename: 'sage-courier-161212-firebase-adminsdk-ka6u9-89af4203cf.json',
}
const gcs = require('@google-cloud/storage')(gcConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.onFileDeleted = functions.storage.object().onDelete( (object, context) => {
  console.log('file is deleted: ', object)
  return;
});

exports.onFileChange = functions.storage.object().onFinalize( (object, context) => {
  const bucket = object.bucket
  const contentType = object.contentType
  const filePath = object.name
  console.log('file change detected, function execution started')

  if(path.basename(filePath).startsWith('resized-')) {
    console.log('We have already named the file')
    return;
  }

  const destBucket = gcs.bucket(bucket)
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath))
  const metadata = { contentType: contentType }

  return destBucket.file(filePath).download({
    destination: tmpFilePath,
  })
  .then(() => {
    return spawn('convert', [tmpFilePath, '-resize', '300x300', tmpFilePath])
  })
  .then(() => {
    return destBucket.upload(tmpFilePath, {
      destination: 'resized-' + path.basename(filePath),
      metadata: metadata
    })
  })

});

exports.uploadFile = functions.https.onRequest((req, res)=> {

  cors(req, res, () => {
    if(req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not Allowed!',
      })
    }

    const busboy = new Busboy({ headers: req.headers })
    let uploadData = null
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename)
      uploadData = { file: filepath, type: mimetype }
      file.pipe(fs.createWriteStream(filepath))
    })

    busboy.on('finish', () => {
      const bucket = gcs.bucket('sage-courier-161212.appspot.com')
      bucket.upload(uploadData.file, {
        uploadData: 'media',
        metadata: {
          metadata: {
            contentType: uploadData.type
          }
        }
      })
      .then(() => {
        return res.status(200).json({
          message: 'It worked!',
          fileUrl: 'gs://sage-courier-161212.appspot.com/' + path.basename(uploadData.file)
        })
      })
      .catch(err => {
        return res.status(500).json({
          error: err,
        })
      })
    })

    busboy.end(req.rawBody)
  
  })

  
})

exports.getFile = functions.https.onRequest((req, res)=> {
  
  console.log("start")
  const bucket = gcs.bucket('sage-courier-161212.appspot.com')
  console.log(bucket)
  const file = bucket.file("ATC FLOW.jpg")
  console.log(file)
  return file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'    
  })
  .then(() => {
    return res.status(200).json({
      message: "it worked again!",
      data: res,
    })
  })
  .catch(error => {
    return res.status(500).send(error)
  })

  
})



