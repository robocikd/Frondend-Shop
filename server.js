const proxy = required('http-proxy-middleware');
const app = express();

const apiProxy = proxy.createProxyMiddleware("/api", {
    target: process.env.BACKEND_URL || 'https://backend-shop-production.up.railway.app',
    changOrigin: true,
    pathRewrite: {
        '^/api':''
    }
});

app.use(apiProxy);
app.use(express.static(__dirname + "/dist/shop"));

app.get("/*", (res, req)=>{
    res.sendFile(__dirname + "/dist/shop/index.html")
});

app.listen(process.env.PORT || 3000);