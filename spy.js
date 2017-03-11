let express = require('express')
let cheerio = require('cheerio')
let axios = require('axios')
let fs = require('fs')
let app = express()
const id = 529590
const baseUrl = `http://www.pixiv.net`

//TODO 需要解决被P站403
axios.get(`http://www.pixiv.net/member_illust.php?id=${id}`)
    .then((res) => {

        return cheerio.load(res.data)
    })
    .then((data) => {
        let $ = data
        let result = []
        $('._work').each((key, value) => {
            result.push($(value).attr('href'))
        })
        // console.log(`${baseUrl}${result[0]}`)
        axios.defaults.headers.common['Cookie'] = `p_ab_id=6; device_token=bfdf1d47e5d0476f7cccc54d25ac0733; login_ever=yes; a_type=0; is_sensei_service_user=1; p_ab_id_2=3; PHPSESSID=15748682_bf69596ff83a951bab93ca2f8d986a0d; module_orders_mypage=%5B%7B%22name%22%3A%22recommended_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22everyone_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22following_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22mypixiv_new_illusts%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22fanbox%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22featured_tags%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22contests%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22sensei_courses%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22spotlight%22%2C%22visible%22%3Atrue%7D%2C%7B%22name%22%3A%22booth_follow_items%22%2C%22visible%22%3Atrue%7D%5D`
        axios.get(`${baseUrl}${result[0]}`)
            .then((res) => {
                // console.log(res.data)
                let $ = cheerio.load(res.data)
                $('._work img').each((key, value) => {
                    console.log($(value).attr('src'))
                    axios.get($(value).attr('src'))
                        .then((res) => {
                            console.log(res)
                        })
                })
            })
       
    })