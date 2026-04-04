# website
Alpaca Games Website

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# https

certbot + nginx

lwbsyz@gmail.com

www.alpacagames.us market.alpacagames.us

ssh -i '/Users/liwb/workspace/alpaca/keystore/server/alpaca-website-20231106.pem' ubuntu@3.135.235.113

scp -i '/Users/liwb/workspace/alpaca/keystore/server/alpaca-website-20231106.pem' ./dist.zip ubuntu@3.135.235.113:/home/ubuntu/uploads

unzip public.zip

sudo rsync -rtvu --delete --exclude-from /home/ubuntu/uploads/sync_website_exclude.txt /home/ubuntu/uploads/dist/ /var/www/html/

exclude example:
```
__MACOSX
```

dns
301 alpacagames.us -> https://www.alpacagames.us

现有域名在：squarespace.com  
wowgames.us 子域名：
- market
- web
- policy
- www 并没使用

常用链接
- https://web.wowgames.us/app-ads.txt
- https://policy.wowgames.us/privacy/wowgames.html