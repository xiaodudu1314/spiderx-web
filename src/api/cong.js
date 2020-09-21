//配置环境
export  let gatewayUrl="https://sdve-dev.analyst.ai/api/gateway"
if (window.location.host.indexOf('localhost') >= 0) {
    //本地调试
    gatewayUrl = 'https://sdve-dev.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-dev') >= 0) {
    gatewayUrl = 'https://sdve-dev.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-test') >= 0) {
    gatewayUrl = 'https://sdve-test.analyst.ai/api/gateway';
} else if (window.location.host.indexOf('-prac') >= 0) {
    gatewayUrl = 'https://sdve-prac.analyst.ai/api/gateway';
}
/*
else {
    gatewayUrl = 'https://sdve.analyst.ai/api/gateway';
}
*/

