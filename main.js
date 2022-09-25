const axios = require('axios');
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var ip = ""

UpdateIp();

console.log("----------------------------");
console.log("- LKI DynDNS Client v0.0.1 -");
console.log("-       © Tarek Laun       -");
console.log("----------------------------");

function UpdateAllDomains() {
    var dns = config["DNSs"];
    dns.forEach(element => {
        UpdateDomain(element["Hostname"], element["Password"], element["Domain"], ip, element["Service"]);
    })
}

function UpdateDomain(hostname, password, domain, _ip, service) {
    console.log("[DynDNS] Update Domain " + domain + " to ip " + _ip + ".");
    if (service == "Strato") {
        UpdateStratoDomain(hostname, password, domain, _ip)
    }else {
        console.log("[DnyDNS] Cannot finde Service.");
    }
}

function UpdateStratoDomain(hostname, password, domain, _ip) {
    axios
        .get('https://' + hostname + ':' + password + '.@dyndns.strato.com/nic/update?hostname=' + domain + '&myip=' + _ip)
        .then(res => {
            console.log("[DynDNS] Update Successful.");
        })
        .catch(error => {
        console.error(error);
    });
}

function UpdateIp() {
    axios
        .get('http://checkip.amazonaws.com')
        .then(res => {
            if (ip != res.data.toString().replace("\n", "")) {
                ip = res.data.toString().replace("\n", "");
                UpdateAllDomains()
            }
        })
        .catch(error => {
        console.error(error);
    });
}

var minutes = config["IpCheckInterval"], the_interval = minutes * 60 * 1000;
setInterval(function() {
    console.log("[DynDNS] Check ip.");
    UpdateIp();
}, the_interval);