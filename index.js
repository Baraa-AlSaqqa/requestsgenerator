const METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
var URLpath = '/';
var attribute = '';
export default class API {

    static setUrl(url, attr) {
        URLpath = url;
        attribute = attr;
    }

    static http = new Proxy({}, {
        get(target, propKey) {
            const method = METHODS.find(method =>
                propKey.startsWith(method.toLowerCase()))
            if (!method) return;
            const path =
                URLpath +
                propKey
                .substring(method.length)
                .replace(/([a-z])([A-Z])/g, '$1/$2')
                .replace(/\$/g, '/$/')
                .toLowerCase()
            return (...args) => {
                const finalPath = path.replace(/\$/g, () => args.shift())
                const queryOrBody = args.shift() || {}

                if (method.toLowerCase() == 'get' || method.toLowerCase() == "head") {
                    let query = Object.keys(queryOrBody)
                        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(queryOrBody[k]))
                        .join('&');
                    var url = finalPath + '?' + query;
                    return fetch(url + (attribute || ''), {
                        method: method
                    });
                }
                if (queryOrBody != {}) {
                    if (queryOrBody.body != undefined ) {

                    }
                }
                return fetch(finalPath + (attribute || ''), {
                    method: method,
                    mode: 'cors',
                    queryOrBody
                });
            }
        }
    });
}
