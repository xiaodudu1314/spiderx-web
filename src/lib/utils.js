
import axios from "axios";
import uuidv4 from 'uuid/v4';
import qs from 'qs';

const utils = {
    /**
     * 获取url参数
     */
    getUrlParam(name) {
        let search = document.location.search;
        let pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
        let matcher = pattern.exec(search);
        let items = "";
        if (null != matcher) {
            try {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e) {
                try {
                    items = decodeURIComponent(matcher[1]);
                } catch (e) {
                    items = matcher[1];
                }
            }
        }
        return items;
    },
    /**
     * get请求
     */
    get(url, param, call) {
        param.requestId = uuidv4();
        param = this.initParam(param);

        let axiosUrl = param !== "" ? url + "?" + param : url;
        axios.get(axiosUrl, {}).then((res) => {
            if (res.data.code === 200 || res.data.code === "200" || res.data.code === 0) {
                call(res.data.data || res.data.data === false ? res.data.data : {}, null);
            } else if (res.data.code === 403 && window.location.pathname !== "/403") {
                window.location.href = '/403'
            } else if (res.data.message) {
                call(null, res.data.message);
            } else if (res.data.msg) {
                call(null, res.data.msg);
            } else {
                call(null, null);
            }
        }).catch((error) => {
            console.log(error);
            call(null, "请求出错!");
        })
    },

    post(url, data, call) {
        data.requestId = uuidv4();
        const params = qs.stringify(data);
        axios.post(
            url,
            params,
            {
                contentType: "application/x-www-form-urlencoded",
            }).then((res) => {
                if (res.data.code === 200 || res.data.code === 0) {
                    call(res.data.data ? res.data.data : {}, null);
                } else if (res.data.code === 403 && window.location.pathname !== "/403") {
                    window.location.href = '/403'
                } else if (res.data.message) {
                    call(null, res.data.message);
                } else if (res.data.msg) {
                    call(null, res.data.msg);
                } else {
                    call(null, null);
                }
            }).catch((error) => {
                console.log(error);
                call(null, "请求出错!");
            });
    },
    /**
     * param格式化
     */
    initParam(param) {
        return this.arrayJoin(param);
    },
    //数组拼接
    arrayJoin(param) {
        let result = [];
        for (let key in param) {
            let value = param[key];
            result.push(`${key}=${value}`);
        }
        return result.join("&");
    },
}

export default utils;