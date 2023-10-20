
[English](README.md) / [中文版](README-CN.md)

# Free Sending Email Api Service

A private api service for sending email powered by Cloudflare worker project. 

## Prepare Job
1. Prepare a domian, such as `formtome.com`. Now, add a website in [cloudflare-dashboard](https://dash.cloudflare.com/ca3b2549d8dcb98799c42e7b56f4e912/add-site) and build your domain. It maybe cost you about 30min.
2. Select your site and domain, [Enable Email Routing](https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/). It maybe cost you about 5min.
3. Install warngler for delpoy cf worker. Ensure your node version >= 16.13.0 and run :    
```sh
npm install wrangler@latest -g
```

## Setup 
1. Get the code
```sh
git clone git@github.com:maojindao55/cf-send-email-worker.git
```
2. Custom `wrangler.toml`

```sh
name = "send-email-api" 
main = "./index.js" 
compatibility_date = "2022-05-03"
[[send_email]]
type = "send_email"
name = "SEB"
allowed_destination_addresses = ["your-dest@example.com"] 
# Here, replace your verified email address.
```
3. Deploy your worker

```sh
wrangler deploy  --name send-email-worker-api
```

## API Documentation

### Endpoint

`http://{{your-cf-worker-prefix}}.workers.dev/`

### Method

`POST`

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| `sender_email` | `string` | The email address of the sender. |
| `sender_name` | `string` | The name of the sender. |
| `recipient_email` | `string` | The email address of the recipient. |
| `subject` | `string` | The subject of the email. |
| `msg_data` | `string` | The message body of the email. |

### Example Request
```sh
curl -d"sender_email=admin@yourdomain.com&sender_name=FromWorker&recipient_email=your-dest@example.com&subject='Hello Guy!'&msg_data='My first email sent!'" "http://send-email-worker-api.workers.dev/"
```

