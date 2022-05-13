mkcert -install ttvDevRig
mkcert ttvDevRig
$cert = Get-Content ttvDevRig.pem
Remove-Item ./ttvDevRig.pem
$key = Get-Content ttvDevRig-key.pem 
Remove-Item  ./ttvDevRig-key.pem
$key + $cert | Out-File -FilePath ./node_modules/.cache/webpack-dev-server/server.pem

mkcert -install localhost
mkcert localhost
$cert = Get-Content localhost.pem
Remove-Item ./localhost.pem
$key = Get-Content localhost-key.pem 
Remove-Item ./localhost-key.pem
$key + $cert | Out-File -FilePath ./certificates/localhost.pem