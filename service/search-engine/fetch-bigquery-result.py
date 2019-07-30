import sys,os,json,time
from google.cloud import bigquery
try:
    platformName = sys.platform
    # windows 10 key file path
    if platformName == 'win32/64':
        path = os.path.dirname(__file__)
        filePath = path+"\key-file\hacker-news-stories-david-1fa29ef2f998.json"
    else:
         # ubuntu key file path
        path = os.path.dirname(__file__)
        filePath = path+"/key-file/hacker-news-stories-david-1fa29ef2f998.json"
    # set variable with arguments   
    args = json.loads(sys.argv[1])
    if 'title' in args:
        title = args['title']
    else:
        title = ''

    if 'text' in args:
        text = args['text']
    else:
        text = ''
    startdate = args['startdate']
    enddate = args['enddate']
    # SQL for both title and text 
    if title != '' and text != '':
        SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE title LIKE "%'+title+'%" AND text LIKE "%'+text+'%" and time>='+startdate+' and time<='+enddate
    # SQL for text only
    elif title == '' and text != '':
        SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE text LIKE "%' + text + '%" and time>='+startdate+' and time<='+enddate 
    # SQL for title only
    else :
        SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE title LIKE "%' + title + '%" and time>='+startdate+' and time<='+enddate

    #Authenticate bigquery account from key file 
    client = bigquery.Client.from_service_account_json(filePath)
    # Perform a query.
    query_job = client.query(SQL)  # API request
    rows = query_job.result()  # Waits for query to finish
    #fetch and compose data to records object
    records= {}
    records['articles'] = []
    for row in rows:
        record = dict()
        record['title'] = row.title
        record['URL'] = row.url
        record['text'] = row.text
        record['date'] = time.strftime("%Y-%m-%d",time.localtime(row.time))
        records['articles'].append(record)

    output = json.dumps(records)
except Exception as e:
    # Output Error Messgage
    print(e)
else:
    # Output JSON String
    print(output)
