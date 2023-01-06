# Redis

In-memory Database.

## nmap

```
$ nmap -sCV 10.129.157.161 -p 6379
Starting Nmap 7.93 ( https://nmap.org ) at 2023-01-05 22:21 EST
Nmap scan report for 10.129.157.161
Host is up (0.49s latency).

PORT     STATE SERVICE VERSION
6379/tcp open  redis   Redis key-value store 5.0.7

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.71 seconds
```

## redis-cli

```
$ redis-cli -h 10.129.157.161
10.129.157.161:6379> info                                     
# Server                   
redis_version:5.0.7            
redis_git_sha1:00000000                                       
redis_git_dirty:0       
redis_build_id:66bd629f924ac924 
redis_mode:standalone                                         
os:Linux 5.4.0-77-generic x86_64
...
# Keyspace
db0:keys=4,expires=0,avg_ttl=0
10.129.157.161:6379> keys *   //obtain all the keys.
1) "numb"
2) "flag"
3) "temp"
4) "stor"
10.129.157.161:6379> get flag   //get value of key.
"03e1d2b376c37ab3f5319922053953eb"
```
