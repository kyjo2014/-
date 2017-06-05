'use strict'
//Bencode是BitTorrent用在传输数据结构的编码方式
const bencode = require('bencode')
//用于生成用户的nodeID和对种子文件的解析获得infohash
const crypto = require('crypto')
//node实现udp通信的包
const dgram = require('dgram')

//初始请求链接节点
const BOOSTRAP_NODE = [{
        address: 'router.bittorrent.com',
        port: 6881
    },
    {
        address: 'dht.transmissionbt.com',
        port: 6881
    }
]


const nodeID = crypto.createHash('sha1').update((Math.random() * 100000).toString()).digest('hex')
console.log(nodeID)

class DHT {
    constructor(port, address) {
        //生成udp监听器
        this.udp = dgram.createSocket('udp4')
        this.Rtable = new Rtable()
    }
    start() {

    }
    /**
     * @description 
     * 加入DHT网络，因为刚开始的时候本机是不在DHT网络中的
     * 只有通过与一个已在网络中的用户通信才能把自己节点信息、
     * 插入到网络中，并且获取该节点附近的节点信息
     * 
     * @memberof DHT
     */
    joinDHT() {
        this.BOOSTRAP_NODE.forEach(node => {
            this.findNode(node.port, node.address)
        })
    }
    findNode(query) {

    }
    ping(response) {

    }
    getPeers() {

    }
    announcePeer() {

    }
    listen() {
        //端口出错的时候自动关闭
        this.udp.on('error', err => {
            console.log(`udp socket error${err}`)
            this.udp.close()
        })
        //监听端口获取的信息
        this.udp.on('message', (msg, info) => {
            console.log(`get Message${msg}`)
            console.log(`Info ${info}`)
        })

        //udp监听器准备好时提醒
        this.udp.once('listening', () => {
            console.log(`正在监听端口${this.port}`)
        })
        //绑定端口和主机(只监听从固定主机发来的包)
        this.udp.bind(this.port, this.address)
    }

}


/**
 * @description 
 * Routing Table 用来存放node信息
 * @class Rtable
 */
class Rtable {
    constructor() {

    }
}