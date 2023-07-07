class ChangeLog {
    [string]$FileName
    [DateTime]$ChangeDate
    [string]$Description

    ChangeLog([string]$fn, [DateTime]$cd, [string]$ds) {
        $this.FileName = $fn
        $this.ChangeDate = $cd
        $this.Description = $ds
    }
}

# if any changes were made on a given day, log those changes as a line under given day's header

# updates change log 
function Update-LC-ChangeLog {
    param (
        $changeLogObj,
        $repoPath
    )

    $workDone = $false # only updates to true if file was read and written to
    $filePath # variable for file path
    $fileFound = $false # file found

    Get-ChildItem -Path $repoPath | ForEach-Object {
        if ($_.BaseName -eq "ChangeLog") {
            $fileFound = $true
            $filePath = $_.FullName
        }
    }

    if ($fileFound) {
        Write-Host "File was found. Path: " $filePath
        $count = 1
        # prepend newest change log to the file
        $content = Get-Content -Path $filePath | ForEach-Object {
            if ($_.Contains("Auto-updates")) {
                Write-Host "Found Auto-update line at $count"
                $_ -replace $_, "$($_)`n`n## Change made on $($changeLogObj.ChangeDate) to $($changeLogObj.FileName):`n`n$($changeLogObj.Description)"
            } else {
                $_
                Write-Host $count
            }
            $count++
        }
        $content | Set-Content -Path $filePath # re-write content below - keeps previous change logs
        
        if ($count -gt 1) { $workDone = $true }

    } else {
        Write-Host "File was not found."
    }

    return $workDone
}