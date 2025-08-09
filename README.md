Git with SSH Key for Authentication pushing/pulling

1. Generate an SSH key
ssh-keygen -t ed25519 -C "darshank4070@gmail.com"
ssh-keygen -t ed25519 -C "darshan.k@sequel.co.in"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

-------> Start from here <--------

2. Add the SSH key to GitHub
cat ~/.ssh/id_ed25519.pub
3. Test the connection again
ssh -T git@github.com
Hi username! You've successfully authenticated, but GitHub does not provide shell access.


SET username and email for that folder path
# In personal repo
git config user.name "Personal Name"
git config user.email "personal@email.com"

# In work repo
git config user.name "Work Name"
git config user.email "work@email.com"

# Clone using SSH
git clone git@github.com:Sindhu-Chinnaswamy31/devTinder.git