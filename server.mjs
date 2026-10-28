import http from 'node:http';
import next from 'next';

const port=Number(process.env.PORT||10000);
const app=next({dev:false,hostname:'0.0.0.0',port});
await app.prepare();
const handle=app.getRequestHandler();
http.createServer((request,response)=>{
  const url=new URL(request.url||'/','http://localhost');
  // Keep existing bookmarks while matching Next's router and bootstrap base.
  if(url.pathname!=='/veterans-tribute'&&!url.pathname.startsWith('/veterans-tribute/')){
    response.writeHead(307,{Location:'/veterans-tribute'+url.pathname+url.search});
    response.end();return;
  }
  handle(request,response);
}).listen(port,'0.0.0.0');
