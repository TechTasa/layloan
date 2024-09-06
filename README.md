# Requirements
 1.Node Js <a href="https://nodejs.org/en/download/current">Download</a><br>
 2.Git <a href="https://git-scm.com/downloads">Download</a><br>
 3.VSCode <a href="https://code.visualstudio.com/download">Download</a><br>

# Git Setup (First time only)
```
git config --global user.name John Doe
```
```

git config --global user.email johndoe@example.com
```
# Installation
 Open Terminal In VSCODE:

```
git clone https://github.com/TechTasa/rupeexpertNode.git
```

```
cd rupeexpertNode
```
## Select Branch

```
git checkout -b main
```
OR
```
git checkout -b test
```
OR
```
git checkout -b sell
```
OR
```
git checkout -b inhouse
```
## Install Dependencies
``` 
npm install
```


## Create .env file in root directory

![image](https://github.com/TechTasa/rupeexpertNode/assets/107754791/6ae7c7c9-8d87-4319-8869-e0f0f61abd2d)<br>


## Put credentials in .env file

![image](https://github.com/TechTasa/rupeexpertNode/assets/107754791/b1b216c0-5974-4f3c-a824-1411bfa32134)<br>


## Note: each branch will have different credentials

## Run Project
```
npm run dev
```
OR

```
npm start
```


## By default it will run on http://localhost:611


## Making Changes & Pushing to github

```
git add .
```
```
git commit -m "changed this & that"  
```
Change "changed this & that" with the changes you made.For e.g you changed services page : "changed service page"

```
git push
```
    
## File/Folder Structure

```
└── 📁rupeexpertNode
    └── 📁config
    └── 📁controllers
    └── 📁middlewares
    └── 📁models
    └── 📁public
        └── 📁css
        └── 📁html
        └── 📁images
        └── 📁js
    └── README.md
    └── 📁routes
    └── server.js
    └── 📁uploads
    └── 📁utils
    └── 📁views
        └── apply.ejs
        └── asasd.ejs
        └── blogCreate.ejs
        └── blogDetail.ejs
        └── blogEdit.ejs
        └── blogList.ejs
        └── blogPageDetail.ejs
        └── blogPageIndex.ejs
        └── business.ejs                 Services/Business Loan Page
        └── career.ejs                   Career Page 
        └── careerapply.ejs
        └── contact.ejs                  Contact Page
        └── createJob.ejs
        └── createmanagement.ejs
        └── creditcard.ejs               Services/Credit Card Page
        └── dashboard.ejs
        └── editJob.ejs
        └── editmanagement.ejs
        └── home.ejs                     Home Page
        └── homeloan.ejs                 Services/Home Loan Page
        └── jobs.ejs
        └── leads.ejs
        └── loanpage.ejs
        └── login.ejs                    Login Page
        └── management.ejs
        └── micro.ejs                    Services/Micro Loan Page
        └── personal.ejs                 Services/Personal Loan Page
        └── resume.ejs
        └── resumes.ejs
        └── services.ejs                 Services Page
        └── signup.ejs
```


