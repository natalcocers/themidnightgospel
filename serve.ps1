$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8744/")
$listener.Start()
Write-Host "Serving on http://localhost:8744/"

$mimeMap = @{
  ".html" = "text/html"; ".css" = "text/css"; ".js" = "application/javascript"
  ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg"; ".gif" = "image/gif"
  ".webp" = "image/webp"; ".svg" = "image/svg+xml"; ".mp4" = "video/mp4"; ".mov" = "video/quicktime"; ".ttf" = "font/ttf"
  ".ico" = "image/x-icon"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  $path = $request.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }
  $filePath = Join-Path $PSScriptRoot $path.TrimStart("/")

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath)
    $mime = $mimeMap[$ext]
    if (-not $mime) { $mime = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentType = $mime
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $response.StatusCode = 404
  }
  $response.OutputStream.Close()
}
