[English](README.md) / [中文版](README-CN.md)
# 免费发送电子邮件 API 服务

一个由 Cloudflare worker 项目驱动的用于发送电子邮件的私有 API 服务。

## 准备工作
1. 准备一个域名，例如 `formtome.com`。现在，在 [cloudflare-dashboard](https://dash.cloudflare.com/ca3b2549d8dcb98799c42e7b56f4e912/add-site) 中添加一个网站并构建您的域名。这可能需要大约 30 分钟。
2. 选择您的站点和域名，[启用电子邮件路由](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/)。这可能需要大约 5 分钟。
3. 安装 wrangler 以部署 cf worker。确保您的 node 版本 >= 16.13.0 并运行：
```sh
npm install wrangler@latest -g
```

## 设置
1. 获取代码
```sh
git clone git@github.com:maojindao55/cf-send-email-worker.git
```
2. 自定义 `wrangler.toml`

```sh
name = "send-email-api" 
main = "./index.js" 
compatibility_date = "2022-05-03"
[[send_email]]
type = "send_email"
name = "SEB"
allowed_destination_addresses = ["your-dest@example.com"] 
# 在这里，替换为您验证过的电子邮件地址。
```
3. 部署您的 worker

```sh
wrangler deploy  --name send-email-worker-api
```

## API 文档

### 地址

`http://{{your-cf-worker-prefix}}.workers.dev/`

### 方法

`POST`

### 参数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `sender_email` | `string` | 发件人的电子邮件地址。 |
| `sender_name` | `string` | 发件人的名称。 |
| `recipient_email` | `string` | 收件人的电子邮件地址。 |
| `subject` | `string` | 电子邮件的主题。 |
| `msg_data` | `string` | 电子邮件的正文。 |

### 示例请求

```sh
curl -d"sender_email=admin@yourdomain.com&sender_name=FromWorker&recipient_email=your-dest@example.com&subject='Hello Guy!'&msg_data='My first email sent!'" "http://send-email-worker-api.workers.dev/"
```

注意，端点 URL 中的 `your-cf-worker-prefix` 需要替换为实际的 worker 前缀。
