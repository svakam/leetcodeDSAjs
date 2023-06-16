# runs every 12am PST
# https://learn.microsoft.com/en-us/powershell/module/psscheduledjob/?view=powershell-5.1

# Specify commans SC runs: ScriptBlock parameter
# Specify script that SC runs: FilePath parameter
# Add job trigger/s: Trigger parameter 
# Customize: Options parameter

$taskName = "LeetcodeJSDailyUpdate"
$repoPath = (Get-Location).ToString()

# README.md: refreshes files for each category, sorts alphabetically
function Update-LC-Readme {
    
}


# add change log to change log file:
    # search for change log file
    # if not exists, create new file
    # search for headers
    # add text with timestamp

function Update-LC-ChangeLog {
    
}


# LastModified.md: 
    # at start of new week, creates new header "# Week of Monday, <Date>"
    # runs through full file list and adds to header by file's last modified date
        # iterate through headers encountered, add as key of dictionary
        # iterate recursively through file list excluding non-coding problem files
            # add file to a key if file's last modified is 
            # stretch: file links? 
    # this helps me keep track of most recent problems reviewed for better review

function Extract-Date {
    param (
        $MdHeader
    )

    $date = $MdHeader.Substring($MdHeader.IndexOf(", "))
    $date = $date.Substring(2)
    $month = $date.Substring(0, $date.IndexOf("/"))
    $dateTrimmedMonth = $date.Substring($date.IndexOf("/") + 1)
    $day = $dateTrimmedMonth.Substring(0, $dateTrimmedMonth.IndexOf("/"))
    $year = $dateTrimmedMonth.Substring($date.IndexOf("/") + 2)

    return Get-Date -Month $month -Day $day -Year $year -Hour 0 -Minute 0 -Second 0
}

function Add-Filenames-Headers {
    param (
        $repoPath,
        $filePath
    )

    Write-Host "Adding file names to headers."
    Write-Host "Repo path: $repoPath"
    Write-Host "Last modified file path: $filePath"

    Write-Host ".git: " "$repoPath\.git"
    (Get-ChildItem -Path $repoPath -Exclude "*.git") |
        Get-ChildItem -Recurse -File | ForEach-Object {
            Write-Output $_.BaseName $_.LastWriteTime

        }
}
# 06/18/2023 - [[f4.js, 06/19/2023 9am]]
# 06/11/2023 - [[f3.js, 06/11/2023 6am]]
# 06/04/2023 - [[f1.js,06/05/2023 7:30am], [f2.js,06/07/2023 8:00am]

function Update-LC-LastModified {
    Write-Output "Repo path: $repoPath"
    $filePath

    # set to true if file was found and work was done
    $fileFound = $false
    $workDone = $false
    
    # find last modified file
    Get-ChildItem -Path "$repoPath" | ForEach-Object { 
        if ($_.BaseName -eq "LastModified") {
            
            $fileFound = $true
            $filePath = $_.FullName
            $workDone = $true
        }
    }

    # checks
    if (!$fileFound) {
        Write-Host "File was not found."
        break
    }
    else {
        Write-Host "File was found. Path: " $filePath

        # find most recent header
        $mostRecentHeader
        $content = (Get-Content -Path $filePath)
        foreach ($line in $content) {
            if ($line -like "##*") {
                $line
                $mostRecentHeader = $line
                break
            }
        }
        Write-Host "Most recent header: $mostRecentHeader"

        # extract date and check if it's been 7+ days since then
        $extractedDate = Extract-Date -MdHeader $mostRecentHeader
        Write-Host "Extracted date: $extractedDate"
        $date = Get-Date
        $dateString = "Week of Sunday, " + $date.Month + "/" + $date.Day + "/" + $date.Year
        if ($extractedDate.Date.AddDays(7) -le $date.Date) {
            Write-Host "Been 7 days since most recent header. Add new header"
            # append new header between "# Last Modified" and the most recent last week header
            (Get-Content -Path $filePath) |
                ForEach-Object {
                    if ($_ -eq "# Last Modified") {
                        $_ -Replace "# Last Modified", "# Last Modified`n`n## $dateString"
                    } else {
                        $_
                    }
                } | Set-Content -Path $filePath
        } else {
            Write-Host "Still within last header's week. Don't append new header"
        }

        Add-FileNames-Headers -RepoPath $repoPath -FilePath $filePath
    }
        
    if (!$workDone) { Write-Host "Work could not be done." }
    else { Write-Host "Work was completed." }
}

function Update-Leetcode-Files {
    Update-LC-Readme
    Update-LC-LastModified
    Update-LC-ChangeLog
}

# registers new job with trigger 12pm daily, script block specified below
#function Register-LeetcodeJob {
#    $T = New-JobTrigger -Daily -At "12:00 PM"
#    Write-Output $T
#    Register-ScheduledJob -Name $taskName -Trigger $T -ScriptBlock {
#        Update-Leetcode-Files
#    }
#    $job = Get-ScheduledJob -Name $taskName
#    if (!$job) { 
#        throw "Job was unable to register."
#    }
#    Write-Host "Registered new Leetcode job."
#}

# check for existing job on local system: if doesn't exist, register it
#$taskExists = Get-ScheduledTask | Where-Object { $_.TaskName -like $taskName }
#if (!$taskExists) {
#    Register-LeetcodeJob
#}

Update-LC-LastModified

#try {
#    $leetcodeJob = Get-ScheduledJob -Name $taskName
#    $leetcodeJob.Name
#    exit 0
#}
#catch {
#    "Job does not exist $_"
#}


