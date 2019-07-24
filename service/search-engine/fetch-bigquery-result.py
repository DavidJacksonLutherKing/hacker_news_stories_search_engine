import sys,os,json,time
from google.cloud import bigquery
path = os.getcwd().replace('\web','')+'\service\search-engine'
# path = os.getcwd()
args = json.loads(sys.argv[1])
if 'title' in args:
    title = args['title']
else:
    title = ''

if 'text' in args:
    text = args['text']
else:
    text = ''

if title != '' and text != '':
    SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE title LIKE "%'+title+'%" AND text LIKE "%'+text+'%" LIMIT 100;'
elif title == '' and text != '':
    SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE text LIKE "%' + text + '%" LIMIT 100;'
else :
    SQL ='SELECT title,url,text,time FROM `hacker-news-stories-david.hacker_news.stories` WHERE title LIKE "%' + title + '%"LIMIT 100;'


client = bigquery.Client.from_service_account_json(
    path+"\key-file\hacker-news-stories-david-1fa29ef2f998.json"
)
# Perform a query.
query_job = client.query(SQL)  # API request
rows = query_job.result()  # Waits for query to finish

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
print(output)