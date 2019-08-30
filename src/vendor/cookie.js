
const cookie = {
    set: (name, value, expire) => {
        let date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        document.cookie = name + "=" + escape(value) + "; expires=" + date.toGMTString()
    },
    get: (name) => {
        if (document.cookie.length > 0) {
            let begin = document.cookie.indexOf(name + "=")
            if (begin != -1) {
                begin = begin + name.length + 1
                let end = document.cookie.indexOf(";", begin)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(begin, end))
            }
        }
        return ""
    },
    remove: (name) => {
        setCookie(name, "", -1)
    }
}

export default cookie;