const axios = require('axios');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { log } = require('seacommon'); // 假设你已经有了seacommon包，并且可以这样引用

// 辅助函数：智能序列化响应数据
function serializeResponseData(data) {
  try {
      // 尝试解析为 JSON，然后美化
      return JSON.stringify(JSON.parse(data), null, 2);
  } catch (error) {
      // 如果解析失败，返回原始字符串
      return data;
  }
}
// 普通的HTTP GET请求
async function httpGetNew(url) {
  try {
    log(`Sending HTTP GET request to ${url}`, "INFO");
    const response = await axios.get(url);
    const responseData = serializeResponseData(response.data);
    log(`Response from ${url}: ${responseData}`, "INFO");
    return response.data;
  } catch (error) {
    log(`Error during HTTP GET request to ${url}: ${error}`, "ERROR");
  }
}

// 普通的HTTP POST请求
async function httpPostNew(url, data) {
  try {
    log(`Sending HTTP POST request to ${url} with data ${JSON.stringify(data)}`, "INFO");
    const response = await axios.post(url, data);
    const responseData = serializeResponseData(response.data);
    log(`Response from ${url}: ${responseData}`, "INFO");
    return response.data;
  } catch (error) {
    log(`Error during HTTP POST request to ${url}: ${error}`, "ERROR");
  }
}

// 通过SOCKS5代理的HTTP GET请求
async function httpGetByS5ProxyNew(url, proxyUrl) {
  try {
    const agent = new SocksProxyAgent(proxyUrl);
    log(`Sending HTTP GET request to ${url} via SOCKS5 proxy ${proxyUrl}`, "INFO");
    const response = await axios.get(url, { httpAgent: agent, httpsAgent: agent });
    const responseData = serializeResponseData(response.data);
    log(`Response from ${url} via SOCKS5 proxy: ${responseData}`, "INFO");
    return response.data;
  } catch (error) {
    log(`Error during HTTP GET request to ${url} via SOCKS5 proxy: ${error}`, "ERROR");
  }
}

// 通过SOCKS5代理的HTTP POST请求
async function httpPostByS5ProxyNew(url, data, proxyUrl) {
  try {
    const agent = new SocksProxyAgent(proxyUrl);
    log(`Sending HTTP POST request to ${url} with data ${JSON.stringify(data)} via SOCKS5 proxy ${proxyUrl}`, "INFO");
    const response = await axios.post(url, data, { httpAgent: agent, httpsAgent: agent });
    const responseData = serializeResponseData(response.data);
    log(`Response from ${url} via SOCKS5 proxy: ${responseData}`, "INFO");
    return response.data;
  } catch (error) {
    log(`Error during HTTP POST request to ${url} via SOCKS5 proxy: ${error}`, "ERROR");
  }
}

module.exports = {
  httpGetNew,
  httpPostNew,
  httpGetByS5ProxyNew,
  httpPostByS5ProxyNew
  // 其他函数如果有的话也加在这里
};