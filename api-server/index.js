const express = require('express')
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs')
const { generateSlug } = require('random-word-slugs')
const { Server } = require('socket.io')
const Redis = require('ioredis')


const app = express()
const PORT = 9000

const subscriber = new Redis({
    host:'redis-12741.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
    port:12741,
    password:'wjFJFgtzCntwQdhUzUtrykTN9il0elYi'
})

const io = new Server({ cors: '*' })


io.on('connection', socket => {
    socket.on('subscribe', channel => {
        socket.join(channel)
        socket.emit('message', `Joined ${channel}`)
    })
})

io.listen(9002, () => console.log('Socket Server 9002'))





const ecsClient = new ECSClient({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAQXUIXJSCOBQEJOMZ',
        secretAccessKey: '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'
    }
})

const config = {
    CLUSTER: 'arn:aws:ecs:ap-south-1:050752605316:cluster/upcloud-builder-cluster',
    TASK: 'arn:aws:ecs:ap-south-1:050752605316:task-definition/builder-cluster10'
}

app.use(express.json())

app.post('/project', async (req, res) => {
    const { gitURL, slug } = req.body
    const projectSlug = slug ? slug : generateSlug()

    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-064ba01704360a286', 'subnet-0aca4953ca7763599', 'subnet-0d66d4da75811a181'],
                securityGroups: ['sg-0a157afe7dfe1cf84']
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'builder-task-10',
                    environment: [
                        { name: 'GIT_REPOSITORY__URL', value: gitURL },
                        { name: 'PROJECT_ID', value: projectSlug }
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command);
    return res.json({ status: 'queued', data: { projectSlug, url: `http://${projectSlug}.localhost:8000` } })


})


async function initRedisSubscribe() {
    console.log('Subscribed to logs....')
    subscriber.psubscribe('logs:*')
    subscriber.on('pmessage', (pattern, channel, message) => {
        io.to(channel).emit('message', message)
    })
}
initRedisSubscribe()

app.listen(PORT, () => console.log(`API Server Running..${PORT}`))