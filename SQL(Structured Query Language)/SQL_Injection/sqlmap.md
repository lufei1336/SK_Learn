## sqlmap

use request file
```
sqlmap -r request --batch --level5 --risk 3 
sqlmap -r request --batch --level 5 --risk 3 --technique=U --dbms=PostgreSQL --dbs

```

`--technique
```

    B: Boolean-based blind
    E: Error-based
    U: Union query-based
    S: Stacked queries
    T: Time-based blind
    Q: Inline queries
```
