const METHODS = ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT", "SEARCH"];
var URLpath = '/';
var attribute = '';

 class API {
    static setUrl (url, attr)   {
        URLpath = url;
        attribute = attr;
    }
    static  http = new Proxy({}, {
                get(target, propKey) {
                    propKey = propKey.toString()+'';
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
                        return fetch(finalPath + (attribute || ''), {
                            method: method,
                            mode: 'cors',
                            queryOrBody
                        });
                    }
                }
        });
}

module.exports = API;