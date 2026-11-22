param([ValidateSet('contract-test','ui-test','build','start','node','prepare')][string]$Task='start')
$ErrorActionPreference='Stop'
$tokenNode='C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1119-907-0_26.1119.907.0_x64__3k8sg7r9htsxt\dependencies\node\bin\node.exe'
if(!(Test-Path -LiteralPath $tokenNode)){$tokenNode=(Get-Command node).Source}
$tokenVersion=& $tokenNode --version
if([int]($tokenVersion.TrimStart('v').Split('.')[0])-lt 22){throw 'Требуется Node.js 22.13 или новее'}
switch($Task){
 'contract-test'{Set-Location (Join-Path $PSScriptRoot 'token-contract'); & $tokenNode node_modules/hardhat/dist/src/cli.js test}
 'node'{Set-Location (Join-Path $PSScriptRoot 'token-contract'); & $tokenNode node_modules/hardhat/dist/src/cli.js node}
 'prepare'{Set-Location (Join-Path $PSScriptRoot 'token-contract'); & $tokenNode scripts/prepare.mjs}
 'ui-test'{Set-Location (Join-Path $PSScriptRoot 'token-ui'); & $tokenNode --test tests/amount.test.ts}
 'build'{Set-Location (Join-Path $PSScriptRoot 'token-ui'); & $tokenNode node_modules/next/dist/bin/next build --webpack}
 'start'{Set-Location (Join-Path $PSScriptRoot 'token-ui'); & $tokenNode node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001}
}
