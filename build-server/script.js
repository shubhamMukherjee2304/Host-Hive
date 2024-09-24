const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')
const Redis = require('ioredis')
const { Kafka } = require('kafkajs')

// const publisher = new Redis({
//     host:'',
//     port:12741,
//     password:''
// })





const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: '',
        secretAccessKey: 'l'
    }
})

const PROJECT_ID = process.env.PROJECT_ID
const DEPLOYEMENT_ID = process.env.DEPLOYEMENT_ID


const kafka = new Kafka({
    clientId: ``,
    brokers: [''],
    ssl: {
        ca: [fs.readFileSync(path.join(__dirname, ''), 'utf-8')]
    },
    sasl: {
        username: '',
        password: '',
        mechanism: 'plain'
    }

})

const producer = kafka.producer()

async function publishLog(log) {
    await producer.send({ topic: `container-logs`, messages: [{ key: 'log', value: JSON.stringify({ PROJECT_ID, DEPLOYEMENT_ID, log }) }] })
}






async function init() {

    await producer.connect()


    console.log('Executing script.js');
    await publishLog('Build Started...')
    const outDirPath = path.join(__dirname, 'output')
    const p = exec(`cd ${outDirPath} && npm install && npm run build`)


    p.stdout.on('data', function (data) {
        console.log(data.toString())
        publishLog(data.toString())
    })
    p.stdout.on('error', function (data) {
        console.log('Error', data.toString())
        publishLog(`error: ${data.toString()}`)
    })

    p.on('close', async function () {
        console.log('Build Complete')
        await publishLog(`Build Complete`)
        const distFolderPath = path.join(__dirname, 'output', 'dist')
        const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true })
        await publishLog(`Starting to upload`)
        for (const file of distFolderContents) {
            const filePath = path.join(distFolderPath, file)

            if (fs.lstatSync(filePath).isDirectory()) continue;

            console.log('uploading', filePath)
            await publishLog(`uploading ${file}`)

            const command = new PutObjectCommand({
                Bucket: 'my-s3project-for-cloudup',
                Key: `__outputs/${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command)
            await publishLog(`uploaded ${file}`)



        }
        await publishLog(`Done`)
        console.log('Done...')
        process.exit(0)
    })
}

init()
