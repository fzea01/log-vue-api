const express = require('express')
require('./db/mongoose')
const Rawlog = require('./models/rawlog')

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


const createLog = () => {
    let dateTime = new Date()
    let services = ['udp/443','udp/5678','HTTPS','HTTP','SMB','tcp/22222','tcp/8013','tcp/8013','tcp/9999','DNS']
    let service = `${services[Math.floor(Math.random() * services.length)]}`
    let srcip = `192.168.${Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 255)}`
    let destip = `192.168.${Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 255)}`
    let logData = {
        "datetime" : dateTime,
        "src_ip" : srcip,
        "dest_ip" : destip,
        "service" : service,
        "appcat" : "unscanned",
        "rawdata" : `="date=${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()} time=${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()} devname=ragnar-gw devid=FG100D3G16805066 logid=0001000014 type=traffic subtype=local level=notice vd=root eventtime=1598236470936249179 tz=+0700 srcip=${srcip} srcport=63820 srcintf=lan srcintfrole=lan dstip=${destip} dstport=8013 dstintf=root dstintfrole=undefined sessionid=292513 proto=6 action=deny policyid=0 policytype=local-in-policy service=${service} dstcountry=Reserved srccountry=Reserved trandisp=noop app=Endpoint Control Registration duration=0 sentbyte=0 rcvdbyte=0 sentpkt=0 appcat=unscanned crscore=5 craction=262144 crlevel=low srchwvendor=Apple devtype=Computer srcfamily=MacBookPro osname=Debian srcswversion=10 mastersrcmac=00:9f:27:e0:1f:6c srcmac=00:9f:27:e0:1f:6c srcserver=0"`
    }

    return logData
}

setInterval( () => {
    const log = new Rawlog(createLog())
    log.save().then( () => {
        console.log('Create log complete')
    }).catch( (e) => {
        console.log(e)
    })
}, 1000)


app.post('/logs', (req,res) => {
    // const log = new Rawlog(req.body)
    const log = new Rawlog(createLog())

    log.save().then( () => {
        res.status(201).send({msg:'Created Log success', data:log})
    }).catch( (e) => {
        res.status(400).send(e)
    })

})

app.get('/logs', (req,res) => {
    // createLog()
    // let timestamp = 1609459200000;
    // let now1 = new Date(timestamp)
    // let now2 = new Date().toLocaleString()
    // // now.format("dd/MM/yyyy hh:mm TT")
    // console.log(now1)
    // console.log(now2)

    Rawlog.find({}).then( (log)=> {
        res.send(log)
    }).catch( (e) => {
        res.status(500).send(e)
    })
})


app.get('*', (req,res) => {
    res.status(404).send('404 Page not found')
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})