
# Search Engine App

<img src="http://i68.tinypic.com/2nas6ds.jpg" border="0" alt="Image and video hosting by TinyPic">

## Background
Nowadays Big Data is very popular and familiar with public. And what can big data improve in our life? Big data will be involved in many areas and many ways, including recommendation in online store, news searching, and even the accurate pushes of business campaigns. And as below, we would like to choose new searching to set up as a project.

This project is to build up an online search engine of Hacker New Stories, composed of a basic API and a frontend portal. We will use Google BigQuery to create a simple solution to help reader research in big data world.

This document is to help you understand how the search engine is designed, developed and deployed.
 
## Content


 
## 1	Prerequisites
**Chapter 1** is to tell you what kind of preparation you need to do before setting up the project.
There are some prerequisites required to be met.
+ Language and version choices
+ Version control tool
+ Abbreviation dictionary

Only when these prerequisites are strictly met can the application be smoothly developed and deployed.

### 1.1	Language Version Choices
**Section 1.1** is to help you understand which languages are chosen for this project.
For this application development, **Python** is chosen as the data processing developing language to query data from **BigQuery API** and **JavaScript (NodeJS)** as the frontend developing language. Please find context below to view the relevant language version. And different python versions are used for python file execution to be compatible in both **Windows 10** and **Ubuntu 16.04 LTS** as below. And **NodeJS** verison is the same in both systems. If you installed other versions and try to run application on your own environment, your will be likely to come into some system compatibility problems which causes application can’t be normally run. The author and the copyright vendor will not take the related legal responsibilities. So be very careful with language version use.

#### 1.1.1	Python 3.6.1 for Windows 10
**Python 3.6.1** is the version in use for **Windows 10**.
+ [Download Here (x64 as an example)](https://www.python.org/ftp/python/3.6.1/python-3.6.1-amd64.exe)
+ [Release Notes](https://docs.python.org/3.6/whatsnew/changelog.html#python-3-6-1-final)

#### 1.1.2	Python 3.6.8 for Ubuntu
**Python 3.6.8** is the version in use for **Ubuntu 16.04 LTS**. Please find the guide for **ubuntu** and follow the steps to install **Python** on your **ubuntu** server.
+ [Installation Guide](https://qiita.com/teruroom/items/4957258784f9182df04f)
+ [Release Notes](https://docs.python.org/3.6/whatsnew/changelog.html#python-3-6-8-final)

#### 1.1.3	NodeJS v10.16.0
**NodeJS v10.16.0** is the version in use for both **Windows 10** and **Ubuntu 16.04 LTS**. This version includes in-built **npm 6.9.0**, which means that you don’t need to install **npm** manually for development use.
+ [Installation Guide for Ubuntu 16.04 LT](https://github.com/nodejs/help/wiki/Installation)
+ [Download NodeJS for Windows 10 (x64 as an example)](https://nodejs.org/dist/v10.16.0/node-v10.16.0-x64.msi )

### 1.2	IDE Choices
**Section 1.2** is to help you understand which IDEs are chosen to develop the application.
#### 1.2.1	Visual Studio Code
**Visual Studio Code** is a light code edit integrated with online optional add-on tool source and version control tool. It is easy to edit front-end code like **html, CSS, JavaScript** and debug tool to debug **Nodejs** Application.

+ [Download VS Code](https://az764295.vo.msecnd.net/stable/2213894ea0415ee8c85c5eea0d0ff81ecc191529/VSCodeUserSetup-x64-1.36.1.exe)

![](http://i68.tinypic.com/15do2zb.jpg)

#### 1.2.2	 PyCharm Community Edition 2017.01.02
**PyCharm Community** is a professional IDE special for **python** coding with debug and interpreter setup.
+ [Download PyCharm Community Edition 2017.01.02](https://download-cf.jetbrains.com/python/pycharm-community-2019.2.exe)

![](http://i63.tinypic.com/rtj1w0.jpg)
 
## 2	Application Design
**Chapter 2** is to demonstrate how this search engine app is designed. Necessary literal statement and images are present where needed.

### 2.1	Use Case Design
**Section 2.1** to is tell you what user portal looks like and how users use this portal to search article from Hacker News Store database and the urgent situations users will meet into as well as how to deal with it.


#### 2.1.1	User Portal
User portal is designed to have a search form in the middle of the screen both vertically and horizontally, with a welcome title “Hacker News Every Day!”, a title input box, a context input box, a data range input box and search button. 
![](http://i67.tinypic.com/2589mk1.jpg)

#### 2.1.2	Use Case – Input both title and context
**Repro Steps:**
+ Input “Google” in title box and “UI” in context box with default date range.
+ Click Search Button or Press **“Enter”** Key.

**Waiting Picture:**
![](http://i63.tinypic.com/2j63igg.jpg)

**Output Picture:**

After users clicked search button, the search form will transform to a search bar to be fixed at the top of the page where it is easy for user to search after they scroll the list down. And the records is composed of a clickable title and a clickable URL which lead users to a blank page waiting for destination loaded. At the bottom of the page, there is a paging tool for users to turn to the page where they want to go.

#### 2.1.3	Use Case – Input only title or context
**Repro Steps:**
+ Input “google” in title box or in context box with default date range.
+ Click Search Button or Press “Enter” Key.

**Output Picture for input “google” in title box:**
![](http://i64.tinypic.com/axxoy0.jpg)

**Output Picture for input “google” in context box:**
![](http://i66.tinypic.com/29m97jn.jpg)

#### 2.1.4	Use Case – Search with data range
**Repro Steps:**
+ Input “google” in title box or in context box with default date range.
+ Select a random date range (2011 – 2015 proposed, here it is from 2013-01-01 to 2013-12-31)
+ Click Search Button or Press “Enter” Key.

**Output Image:**
![](http://i64.tinypic.com/axxoy0.jpg)
#### 2.1.5	Use Case – Error search with neither title and text
**Repro Steps:** 
+ Leave the title box and text box blank.
+ Click Search Button or Press “Enter” Key.

**Output Image:**
![](http://i68.tinypic.com/u4w3c.jpg)
Modal Message: Watch out for your computer. If you input neither of the title nor the context your care about, it's gonna be hacker. HA! HA! 
#### 2.1.6	Use Case – Search No Result.

**Repro Steps:** 
+ Type in a ridiculous word like “dasdafdfgfdg”.
+ Click Search Button or Press “Enter” Key.

**Output Image:**
![](http://i66.tinypic.com/2whqil2.jpg)
It shows “No Search Results” on the page.

#### 2.1.7	Use Case – Server-end Error.
**Repro Steps:** 
+ Type in “UI”.
+ Click Search Button or Press “Enter” Key.
+ Simulate a situation like network change. Plug out your web cable or disconnect your wifi immediately after you press to search.

**Output Image:**
![](http://i67.tinypic.com/2hdr58y.jpg)
Modal Message: Hackers are sleeping. Try to awake them up very later. HA! HA! 
### 2.2	Development Framework Design
**Section 2.2** is to introduce how search engine app interacting among front-end, back-end and BigQuery.

#### 2.2.1	Application Mechanism Demonstration
![](http://i66.tinypic.com/2lc4vop.jpg)
This design of search engine app framework is to separate data query process from node express main process. The advantage is that if some error caused python abort, it will not be down of the web server. This will protect web service procedure effectively even if bigquery script come out down.
Data Flow Steps:
1.	Search Result has been cached in server storage.

| Step Number |	Steps Instructions |
| ---- | ----|
| 1	| User Request data with any valid group of input which user portal provide. Frontend will package the data and send over a asynchronous http request with query variable to back-end server.|
|2	|Router event listener captures the request, then checks if the search request result has been cached in local file. If cached, read the cache file and send back to request handler.|
|3|	Request handler will package the json data and send it to the front-end portal. |
|4|	Front-end browser receives the response json data to web page and renders the html with the search result asynchronously.|

2.	Search Result hasn’t been cached in server storage

| Step Number	| Steps Instructions |
| ---- | ---- |
|1	|User Request data with any valid group of input which user portal provide. Frontend will package the data and send over a asynchronous http request with query variable to back-end server.|
|2|	Router event listener captures the request, then checks if the search request result has been cached in local file. If not cached, send back not cached message to request handler.|
|3	|Request handler hangs up child process to execute cmd command. |
|4|	Command executes python script with virtual env python to query data with BigQuery API of python library.|
|5|	BigQuery receives API request and then query and send the data back to python program.|
|6|	Python program receives the data and outputs the data.|
|7|	Child Process ended python program and send out the output to request handle.|
|8|	Request handler will package the json data and send it to the front-end portal. |
|9|	Front-end browser receives the response json data to web page and renders the html with the search result asynchronously.|

#### 2.2.2	Web Service Package 
|-- web

|   |-- app.js&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“app.js” – to compose of the web application

|   |-- package-lock.json

|   |-- package.json

|   |-- bin&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“bin” – to include www.js which is server 

|   |   |-- www.js

|   |-- cache_data_folder &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“cache_data_folder” –  to hold data json temp files

|   |-- public &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“public” – to hold static files like fonts, images, javascript, styles

|   |   |-- fonts

|   |   |   |-- BloodA.ttf

|   |   |   |-- BloodB.ttf

|   |   |   |-- fontawesome-webfont.woff2

|   |   |   |-- glyphicons-halflings-regular.eot

|   |   |   |-- glyphicons-halflings-regular.svg

|   |   |   |-- glyphicons-halflings-regular.ttf

|   |   |   |-- glyphicons-halflings-regular.woff

|   |   |   |-- glyphicons-halflings-regular.woff2

|   |   |   |-- Kill The Lights.ttf

|   |   |   |-- MetalMacabre.ttf

|   |   |   |-- SolsticeOfSuffering.ttf

|   |   |-- images

|   |   |   |-- hacker.png

|   |   |   |-- hacker2.jpeg

|   |   |   |-- waiting.gif

|   |   |-- javascript

|   |   |   |-- bootstrap.min.js

|   |   |   |-- date.js

|   |   |   |-- daterangepicker.js

|   |   |   |-- index.js

|   |   |   |-- jquery.min.js

|   |   |   |-- moment.min.js

|   |   |   |-- paging.js

|   |   |-- styles

|   |   |   |-- bootstrap.min.css

|   |   |   |-- daterangepicker.css

|   |   |   |-- font-awesome.min.css

|   |   |   |-- index.css

|   |   |   |-- paging.css

|   |-- routes  &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“routes” –  to hold request handler files

|   |   |-- ajax.js

|   |   |-- index.js

|   |-- utilensp;ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“util” – to hold function files

|   |   |-- cache_data.js

|   |   |-- process_data.

|   |   |-- run_cmd.js

|   |-- views&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//	“views” – to hold html render file

|   |   |-- index.ejs


   


#### 2.2.3	BigQuery Script Package
|--service

|   |-- hackernewsstories &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//python virtual environment for  Windows 10 

|   |-- hackernewsstorierubuntu&ensp;//python virtual environment for Ubuntu

|   |-- search-engine&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“search-engine” – python source code

|   |   |-- fetch-bigquery-result.py

|   |   |-- key-file&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;//“key-file” – BigQuery Authentication file

|   |   |   |-- hacker-news-stories-david-1fa29ef2f998.json
 
## 3	Search Engine Development
### 3.1	Portal Design and Development
Html code in ***/web/views/index.js***.

Javascipt souce code and library in ***/web/public/javascript/***.

Fonts files in ***/web/public/fonts/***.

Style files in ***/web/public/style/***.

#### 3.1.1	Search Form & Search bar
**Search form:**

![](http://i66.tinypic.com/34yoc3q.jpg)

**Search bar:**

![](http://i68.tinypic.com/28b731v.jpg)

#### 3.1.2	Message Modal
![](http://i66.tinypic.com/2n852k2.jpg)

#### 3.1.3	Search Results & Paging Tool
![](http://i65.tinypic.com/2qk45rb.jpg)

#### 3.1.4	Waiting picture.
![](http://i68.tinypic.com/35na7tv.jpg)
 
### 3.2	Form Submit Communication (Frontend)
**Section 3.2** is to show you front-end communication design and souce code location.

Code in ***/web/public/javascript/index.js***. 
Communication flow at front-end as below.

![](http://i67.tinypic.com/2rdc46q.jpg)

### 3.3	Form Submit Handler (Backend)
**Section 3.3** is to show you the backend request handle flow design and souce code location.

Code in ***/web/routes/ajax.js***.

Code in ***/web/util/run_cmd.js*** is to hang up the process and execute python script.

Code in ***/web/util/cache_data.js*** to check cached data, fetch cached data, and ache data file.

Request handle flow at backend is as below.
![](http://i68.tinypic.com/rl98af.jpg)

### 3.4	Search Request Process and Output (Python)
**Section 3.4** is to show you the python data query flow design and souce code location.

Code in ***/service/search-key/fetch-bigquery-result.js***.
Data query process flow is as below.
![](http://i68.tinypic.com/x5uq0h.jpg)