# DynDNS-Client
A NodeJS DynDNS Client.

## Config 
```json
{
    "Records": [{
        "Service": "Strato",
        "Hostname": "domain.net",
        "Domain": "subdomain.domain.net",
        "Password": "Password"
    },
    {
        "Service": "CloudFlare",
        "Email": "Cloud Flare Email.",
        "ApiKey": "Cloud Flare Api Key",
        "Domain": "Domain Name",
        "Zone": "Zone ID",
        "Record": "Record Id",
        "Proxied": true
    }],
    "IpCheckInterval": 1 
}
```

## Setup
```bash
npm i
node main.js
```

## Services 
* Strato
* Cloud Flare
