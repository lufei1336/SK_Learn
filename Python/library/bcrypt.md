# bcrypt library fundamental
`bcrypt` is a password-hashing library that provides a way to securely store passwords in a database. It uses the Blowfish algorithm to hash passwords and is designed to be slow and resource-intensive, which makes it more difficult for attackers to crack the hashed passwords. 

Once installed, you can use bcrypt to hash and verify passwords in your Python code. Here's an example:
```python
import bcrypt

# Hash a password
password = b"mysecretpassword"
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

# Check a password against a hash
password_attempt = b"mysecretpassword"
if bcrypt.checkpw(password_attempt, hashed_password):
    print("Password matched!")
else:
    print("Password didn't match.")
```
In this example, we're using the bcrypt.hashpw() function to hash a password with a randomly generated salt. The resulting hash can be safely stored in a database. To check if a user-entered password matches the stored hash, we can use the bcrypt.checkpw() function.

Note that the password and password attempt must be encoded as bytes (b"mysecretpassword") before being passed to the bcrypt functions. Also, the gensalt() function generates a random salt that is appended to the password before hashing, which adds an extra layer of security to the hash.
