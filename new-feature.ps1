param(
    [Parameter(Mandatory=$true)]
    [string]$Feature
)

# Base paths
$basePath      = "src/app/features/$Feature"
$componentsPath= "$basePath/components"
$dtosPath      = "$basePath/dtos"
$servicesPath  = "$basePath/services"

# Função para converter "risco-cirurgico" -> "RiscoCirurgico"
function ToPascalCase($text) {
    $parts = $text -split "-"
    $parts = $parts | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }
    return -join $parts
}

$FeaturePascal = ToPascalCase $Feature

# Cria diretórios
foreach ($p in @($componentsPath, $dtosPath, $servicesPath)) {
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null }
}

# Cria subcomponentes: create e list
foreach ($c in @("create-$Feature", "list-$Feature")) {
    $dir = Join-Path $componentsPath $c
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    foreach ($f in @("$c.ts", "$c.html", "$c.scss", "$c.spec.ts")) {
        $filePath = Join-Path $dir $f
        if (-not (Test-Path $filePath)) { New-Item -ItemType File -Path $filePath -Force | Out-Null }
    }
}

# Cria DTOs no padrão PascalCase (CreateXxxDTO, UpdateXxxDTO, ResponseXxxDTO)
foreach ($dto in @("Create", "Response", "Update")) {
    $dtoFileName = "${dto}${FeaturePascal}DTO.ts"
    $filePath = Join-Path $dtosPath $dtoFileName
    if (-not (Test-Path $filePath)) { New-Item -ItemType File -Path $filePath -Force | Out-Null }
}

# Cria service
$filePath = Join-Path $servicesPath "$Feature.service.ts"
if (-not (Test-Path $filePath)) { New-Item -ItemType File -Path $filePath -Force | Out-Null }

Write-Host "Estrutura básica para feature '$Feature' criada com sucesso!"
