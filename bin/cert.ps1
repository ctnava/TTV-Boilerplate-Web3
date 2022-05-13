mkcert -install -cert-file ./cert.pem -key-file ./key.pem localhost
$cert = Get-Content ./cert.pem
$key = Get-Content ./key.pem

$cert + $key | Out-File -FilePath ./node_modules/.cache/webpack-dev-server/server.pem

Remove-Item ./cert.pem
Remove-Item ./key.pem