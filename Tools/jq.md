# jq usage

```bash
$ curl hat-valley.htb/api/staff-details                                                           
[{"user_id":1,"username":"christine.wool","password":"6529fc6e43f9061ff4eaa806b087b13747fbe8ae0abfd396a5c4cb97c5941649","full
name":"Christine Wool","role":"Founder, CEO","phone":"0415202922"},{"user_id":2,"username":"christopher.jones","password":"e5
9ae67897757d1a138a46c1f501ce94321e96aa7ec4445e0e97e94f2ec6c8e1","fullname":"Christopher Jones","role":"Salesperson","phone":"0456980001"},{"user_id":3,"username":"jackson.lightheart","password":"b091bc790fe647a0d7e8fb8ed9c4c01e15c77920a42ccd0deaca431
a44ea0436","fullname":"Jackson Lightheart","role":"Salesperson","phone":"0419444111"},{"user_id":4,"username":"bean.hill","pa
ssword":"37513684de081222aaded9b8391d541ae885ce3b55942b9ac6978ad6f6e1811f","fullname":"Bean Hill","role":"System Administrato
r","phone":"0432339177"}]
```
use `jq .`
```
$ curl hat-valley.htb/api/staff-details | jq .                           
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current                                              
                                 Dload  Upload   Total   Spent    Left  Speed                                                
100   775  100   775    0     0   1296      0 --:--:-- --:--:-- --:--:--  1298                                               
[
  {
    "user_id": 1,
    "username": "christine.wool",
    "password": "6529fc6e43f9061ff4eaa806b087b13747fbe8ae0abfd396a5c4cb97c5941649",
    "fullname": "Christine Wool",
    "role": "Founder, CEO",
    "phone": "0415202922"
  },
  {
    "user_id": 2,
    "username": "christopher.jones",
    "password": "e59ae67897757d1a138a46c1f501ce94321e96aa7ec4445e0e97e94f2ec6c8e1",
    "fullname": "Christopher Jones",
    "role": "Salesperson",
    "phone": "0456980001"
  },
  {
    "user_id": 3,
    "username": "jackson.lightheart",
    "password": "b091bc790fe647a0d7e8fb8ed9c4c01e15c77920a42ccd0deaca431a44ea0436",
    "fullname": "Jackson Lightheart",
    "role": "Salesperson",
    "phone": "0419444111"
  },
  {
    "user_id": 4,
    "username": "bean.hill",
    "password": "37513684de081222aaded9b8391d541ae885ce3b55942b9ac6978ad6f6e1811f",
    "fullname": "Bean Hill",
    "role": "System Administrator",
    "phone": "0432339177"
  }
]
```
use jq fillter out json data
```
$ curl hat-valley.htb/api/staff-details | jq .[]
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   775  100   775    0     0    957      0 --:--:-- --:--:-- --:--:--   957
{
  "user_id": 1,
  "username": "christine.wool",
  "password": "6529fc6e43f9061ff4eaa806b087b13747fbe8ae0abfd396a5c4cb97c5941649",
  "fullname": "Christine Wool",
  "role": "Founder, CEO",
  "phone": "0415202922"
}
{
  "user_id": 2,
  "username": "christopher.jones",
  "password": "e59ae67897757d1a138a46c1f501ce94321e96aa7ec4445e0e97e94f2ec6c8e1",
  "fullname": "Christopher Jones",
  "role": "Salesperson",
  "phone": "0456980001"
}
{
  "user_id": 3,
  "username": "jackson.lightheart",
  "password": "b091bc790fe647a0d7e8fb8ed9c4c01e15c77920a42ccd0deaca431a44ea0436",
  "fullname": "Jackson Lightheart",
  "role": "Salesperson",
  "phone": "0419444111"
}
{
  "user_id": 4,
  "username": "bean.hill",
  "password": "37513684de081222aaded9b8391d541ae885ce3b55942b9ac6978ad6f6e1811f",
  "fullname": "Bean Hill",
  "role": "System Administrator",
  "phone": "0432339177"
}
```
use jq fillter out username and password
```
$ curl hat-valley.htb/api/staff-details | jq '.[] | "\(.username):\(.password)"'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   775  100   775    0     0   1274      0 --:--:-- --:--:-- --:--:--  1276
"christine.wool:6529fc6e43f9061ff4eaa806b087b13747fbe8ae0abfd396a5c4cb97c5941649"
"christopher.jones:e59ae67897757d1a138a46c1f501ce94321e96aa7ec4445e0e97e94f2ec6c8e1"
"jackson.lightheart:b091bc790fe647a0d7e8fb8ed9c4c01e15c77920a42ccd0deaca431a44ea0436"
"bean.hill:37513684de081222aaded9b8391d541ae885ce3b55942b9ac6978ad6f6e1811f"
```
better to output
```
$ curl -s hat-valley.htb/api/staff-details | jq -r '.[] | "\(.username):\(.password)"' 
christine.wool:6529fc6e43f9061ff4eaa806b087b13747fbe8ae0abfd396a5c4cb97c5941649
christopher.jones:e59ae67897757d1a138a46c1f501ce94321e96aa7ec4445e0e97e94f2ec6c8e1
jackson.lightheart:b091bc790fe647a0d7e8fb8ed9c4c01e15c77920a42ccd0deaca431a44ea0436
bean.hill:37513684de081222aaded9b8391d541ae885ce3b55942b9ac6978ad6f6e1811f
```
