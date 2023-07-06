# class called File_ModDate with properties FileName (name of file + extension) and LastModified (file's last-modified date on the system)
class File_ModDate {
    [string]$FileName
    [DateTime]$LastModified

    File_ModDate([string]$fn, [DateTime]$lm) {
        $this.FileName = $fn
        $this.LastModified = $lm
    }
}

function Add-FilenamesHeaders {
    param (
        $repoPath,
        $filePath
    )

    Write-Host "Adding file names to headers."
    Write-Host "Repo path: $repoPath"
    Write-Host "Last modified file path: $filePath"

    # add existing headers to a hashtable
    $lastModTable = [ordered]@{}
    $bl = Get-Date
    $obja = [File_ModDate]::new(
        "test",
        $bl
    )
    (Get-Content -Path $filePath) |
        ForEach-Object {
            if ($_ -like "##*") {
                $date = Read-Date -MdHeader $_
                $lastModTable.Add($date, (New-Object System.Collections.Generic.List[File_ModDate]))
            }
        }

    $test = (Get-Date -Month 6 -Day 4 -Year 2023 -Hour 0 -Minute 0 -Second 0 -Millisecond 0)
    #foreach ($key in $($lastModTable.keys)) {
    #    $list = ($lastModTable[$key])
    #    $list.Add($obja)
    #    $lastModTable[$key] = $list
    #}
    $lastModTable

    # recurse through all valid files
        # for each file, get first sunday of its week
        # if this sunday exists in the table, add this file and its last modified date as an object to value collection
    (Get-ChildItem -Path $repoPath -Exclude "*.git*","*.md","*.txt","Node*","*.ps1") |
        Get-ChildItem -Recurse -File | ForEach-Object {
            $lastWriteTime = $_.LastWriteTime
            $firstSunday = $lastWriteTime.AddDays(-($lastWriteTime.DayOfWeek)) 
            $firstSunZeroed = Get-Date -Date $firstSunday.Date -Hour 0 -Minute 0 -Second 0 -Millisecond 0
            if (!$lastModTable.Contains($firstSunZeroed)) {
                $lastModTable.Add($firstSunZeroed, (New-Object System.Collections.Generic.List[File_ModDate]))
            } 
            else {
                # create object
                $fileModDateObj = [File_ModDate]::new(
                    $_.Name,
                    $_.LastWriteTime
                )
                $list = $lastModTable[$firstSunZeroed]
                $list.Add($fileModDateObj)
                $lastModTable[$firstSunZeroed] = $list
            }
        }
    $lastModTable
    Write-Output "last mod table"
}