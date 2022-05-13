mkcert -install \ -cert-file cert.pem \ -key-file key.pem \ localhost
Get-Content cert.pem key.pem > node_modules/webpack-dev-server/ssl/server.pem
Remove-Item cert.pem key.pem